const dgram = require("dgram"); // UDP 소켓 모듈
const express = require("express"); // HTTP API를 위한 Express
const cors = require("cors"); // CORS 설정
const WebSocket = require("ws"); // WebSocket (React와 연결)

const app = express();
app.use(express.json());
app.use(cors());

const UDP_SERVER_PORT = 5003; // UDP 서버가 수신할 포트 (HelloDevice UniversalComm과 통신)
const WEBSOCKET_PORT = 5005; // WebSocket 포트 (React 클라이언트 연결)
const UDP_SERVER_HOST = "127.0.0.1"; // UDP 서버 주소

// UDP 서버 소켓 생성 (HelloDevice UniversalComm과 통신)
const udpServer = dgram.createSocket("udp4");

// WebSocket 서버 생성 (React와 연결)
const wss = new WebSocket.Server({ port: WEBSOCKET_PORT });
let clients = []; // 연결된 WebSocket 클라이언트 목록 저장

// WebSocket 클라이언트가 연결되었을 때 실행
wss.on("connection", (ws) => {
    console.log("🔗 WebSocket 클라이언트 연결됨");
    clients.push(ws);

    ws.on("close", () => {
        console.log("🔌 WebSocket 클라이언트 연결 종료");
        clients = clients.filter(client => client !== ws);
    });
});

// UDP 서버가 실행될 때 로그 출력
udpServer.on("listening", () => {
    const address = udpServer.address();
    console.log(`🚀 UDP 서버 실행 중: ${address.address}:${address.port}`);
});

// UDP 서버가 메시지를 수신했을 때 실행
udpServer.on("message", (msg, rinfo) => {
    const receivedMessage = msg.toString();
    const timestamp = Date.now(); // 서버에서 메시지를 받은 시간
    console.log(`📩 UDP 데이터 수신: ${receivedMessage} (From ${rinfo.address}:${rinfo.port})`);

    // WebSocket을 통해 React 클라이언트에 데이터 전달
    const dataToSend = JSON.stringify({ message: receivedMessage, timestamp });

    clients.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(dataToSend);
        }
    });
});

// UDP 서버 시작
udpServer.bind(UDP_SERVER_PORT);

// UDP 클라이언트 (HelloDevice UniversalComm으로 메시지 전송)
const udpClient = dgram.createSocket("udp4");

// React에서 메시지를 받아 UDP 서버로 전송하는 API
app.post("/send", (req, res) => {
    const message = req.body.message || "Hello UDP"; // 기본 메시지 설정
    const buffer = Buffer.from(message);

    // UDP 서버로 메시지 전송
    udpClient.send(buffer, 0, buffer.length, UDP_SERVER_PORT, UDP_SERVER_HOST, (err) => {
        if (err) {
            console.error("❌ UDP 메시지 전송 실패:", err);
            res.status(500).send("UDP 메시지 전송 실패");
        } else {
            console.log(`📨 UDP 메시지 전송: ${message} → ${UDP_SERVER_HOST}:${UDP_SERVER_PORT}`);
            res.send("✅ 메시지 전송 완료: " + message);
        }
    });
});

// Express 서버 실행
app.listen(4000, () => {
    console.log("🚀 HTTP Proxy Server 실행 중: http://localhost:4000");
    console.log("🔗 WebSocket 서버 실행 중: ws://localhost:5005");
});
