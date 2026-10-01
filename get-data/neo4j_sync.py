import os
import sys
import datetime
from dotenv import load_dotenv
from neo4j import GraphDatabase
from github_trending import fetch_trending

# Load biến môi trường từ file .env
load_dotenv()

# Cấu hình kết nối Neo4j lấy từ biến môi trường (fallback về mặc định nếu không có)
NEO4J_URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "")

class TrendingGraph:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def save_trending(self, repos, period_type):
        """
        Lưu danh sách repos vào Neo4j Knowledge Graph
        """
        today = datetime.date.today().isoformat()
        
        with self.driver.session() as session:
            for repo in repos:
                session.execute_write(self._create_or_update_graph, repo, period_type, today)

    @staticmethod
    def _create_or_update_graph(tx, repo, period_type, date_str):
        query = """
        // 1. Tạo hoặc cập nhật Repository
        MERGE (r:Repository {url: $url})
        SET r.name = $name,
            r.description = $description,
            r.stars_total = $stars_total
        
        // 2. Tạo hoặc cập nhật Language và liên kết WRITTEN_IN
        WITH r
        WHERE $language IS NOT NULL AND $language <> 'N/A' AND $language <> ''
        MERGE (l:Language {name: $language})
        MERGE (r)-[:WRITTEN_IN]->(l)
        
        // 3. Xử lý Trending Period
        // Khôi phục r context bằng cách gọi lại từ đầu hoặc tách query
        """
        # Tách query ra thành các block dễ thực thi hơn để tránh mất context của r
        
        query1 = """
        MERGE (r:Repository {url: $url})
        SET r.name = $name,
            r.description = $description,
            r.stars_total = $stars_total
        """
        tx.run(query1, 
               url=repo['url'], 
               name=repo['name'], 
               description=repo['description'], 
               stars_total=repo['stars_total'])
               
        if repo['language'] and repo['language'] != 'N/A':
            query2 = """
            MATCH (r:Repository {url: $url})
            MERGE (l:Language {name: $language})
            MERGE (r)-[:WRITTEN_IN]->(l)
            """
            tx.run(query2, url=repo['url'], language=repo['language'])
            
        query3 = """
        MATCH (r:Repository {url: $url})
        MERGE (p:TrendingPeriod {type: $period_type, date: $date_str})
        MERGE (r)-[t:TRENDING_IN]->(p)
        SET t.stars_added = $stars_period
        """
        tx.run(query3, 
               url=repo['url'], 
               period_type=period_type, 
               date_str=date_str, 
               stars_period=repo['stars_period'])


if __name__ == "__main__":
    period = sys.argv[1] if len(sys.argv) > 1 else "weekly"
    if period not in {"daily", "weekly", "monthly"}:
        print("Tham số phải là 'daily', 'weekly' hoặc 'monthly'")
        sys.exit(1)

    print(f"Đang lấy dữ liệu trending {period}...")
    repos = fetch_trending(since=period)
    
    print(f"Đang kết nối đến Neo4j và lưu {len(repos)} repositories...")
    
    try:
        graph = TrendingGraph(NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD)
        graph.save_trending(repos, period)
        graph.close()
        print("Lưu dữ liệu thành công vào Knowledge Graph!")
    except Exception as e:
        print(f"Lỗi khi lưu vào Neo4j: {e}")
        print("Vui lòng kiểm tra lại cấu hình kết nối (URI, username, password) hoặc đảm bảo Neo4j đang chạy.")
