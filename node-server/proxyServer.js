const net = require("net"); // TCP 클라이언트를 위한 모듈
const express = require("express"); // HTTP 요청 처리
const cors = require("cors"); // CORS 허용
const WebSocket = require("ws"); // WebSocket 모듈

const app = express();
app.use(express.json());
app.use(cors());

const TCP_SERVER_HOST = "127.0.0.1"; // TCP 서버 주소
const TCP_SERVER_PORT = 5003; // TCP 서버 포트
const WEBSOCKET_PORT = 5004; // WebSocket 서버 포트 (React와 동일하게 맞춤)

// WebSocket 서버 생성 (React와 연결)
const wss = new WebSocket.Server({ port: WEBSOCKET_PORT });

let clients = []; // 연결된 WebSocket 클라이언트 목록 저장

wss.on("connection", (ws) => {
    console.log("🔗 WebSocket 클라이언트 연결됨");
    clients.push(ws);

    ws.on("close", () => {
        console.log("🔌 WebSocket 클라이언트 연결 종료");
        clients = clients.filter(client => client !== ws);
    });
});

// TCP 클라이언트 소켓 생성 (연결 유지)
let client = new net.Socket();
let isConnected = false;

// TCP 서버에 연결하는 함수
const connectToTcpServer = () => {
    if (!isConnected) {
        client.connect(TCP_SERVER_PORT, TCP_SERVER_HOST, () => {
            console.log("✅ TCP 서버에 연결됨 (연결 유지)");
            isConnected = true;
        });

        client.on("data", (data) => {
            const receivedMessage = data.toString();
            const timestamp = Date.now(); // 서버에서 메시지를 받은 시간

            console.log("\n📬 TCP 서버 응답:", receivedMessage);
            console.log("===============================\n");

            // WebSocket을 통해 React 클라이언트로 메시지 전달
            const dataToSend = JSON.stringify({
                message: receivedMessage,
                timestamp: timestamp
            });

            clients.forEach(ws => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(dataToSend);
                }
            });
        });

        client.on("error", (err) => {
            console.error("\n❌ TCP 연결 오류:", err);
            isConnected = false;
            setTimeout(connectToTcpServer, 3000); // 3초 후 자동 재연결
        });

        client.on("close", () => {
            console.log("🔌 TCP 연결 종료됨 (재연결 시도)");
            isConnected = false;
            setTimeout(connectToTcpServer, 3000); // 3초 후 자동 재연결
        });
    }
};

// TCP 서버와 지속적으로 연결 유지
connectToTcpServer();

// React에서 메시지를 TCP 서버로 전송하는 API
app.post("/send", (req, res) => {
    const message = req.body.message || "Hello"; // 기본 메시지 설정

    if (isConnected) {
        console.log("\n📨 TCP 서버로 보낼 데이터:", message);
        client.write(message); // TCP 서버로 메시지 전송
        res.send("✅ 메시지 전송 완료: " + message);
    } else {
        res.status(500).send("❌ TCP 서버 연결이 끊어져 있음");
    }
});

// Express 서버 실행
app.listen(4000, () => {
    console.log("🚀 HTTP Proxy Server 실행 중: http://localhost:4000");
    console.log("🔗 WebSocket 서버 실행 중: ws://localhost:5004");
});
