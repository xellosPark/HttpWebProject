import React, { useEffect, useState } from "react";

const WebSocketClient = () => {
    const [message, setMessage] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]); // 최근 10개 메시지
    const [speed, setSpeed] = useState(null); // 최신 통신 속도(ms)
    const [minSpeed, setMinSpeed] = useState(null); // 최소 통신 속도
    const [maxSpeed, setMaxSpeed] = useState(null); // 최대 통신 속도

    useEffect(() => {
        // WebSocket 연결 (TCP 메시지 수신)
        const ws = new WebSocket("ws://localhost:5004");

        ws.onopen = () => {
            console.log("✅ WebSocket 연결 성공");
        };

        ws.onmessage = (event) => {
            const receivedData = JSON.parse(event.data); // 서버에서 JSON 형식으로 전송
            const receivedTime = Date.now(); // 클라이언트에서 메시지를 받은 시간
            const serverTime = receivedData.timestamp; // 서버에서 메시지를 보낸 시간
            const latency = receivedTime - serverTime; // 통신 속도 계산 (밀리초)

            //console.log("📩 TCP 서버에서 받은 메시지:", receivedData.message);
            //console.log("⏱ 통신 속도:", latency, "ms");

            // 최소 및 최대 속도 업데이트
            setSpeed(latency);
            setMinSpeed(prevMin => prevMin === null ? latency : Math.min(prevMin, latency));
            setMaxSpeed(prevMax => prevMax === null ? latency : Math.max(prevMax, latency));

            // 최신 10개 메시지만 유지
            setReceivedMessages(prevMessages => {
                const newMessages = [receivedData.message, ...prevMessages];
                return newMessages.slice(0, 10);
            });
        };

        ws.onclose = () => {
            console.log("🔌 WebSocket 연결 종료");
        };

        ws.onerror = (error) => {
            console.error("❌ WebSocket 오류 발생:", error);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            <h2>TCP 서버와 채팅</h2>
            <h3>📩 최근 10개 메시지:</h3>
            <ul>
                {receivedMessages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>

            <h3>⏱ 통신 속도:</h3>
            <p>현재: {speed !== null ? `${speed} ms` : "데이터 수신 대기 중..."}</p>
            <p>최소: {minSpeed !== null ? `${minSpeed} ms` : "기록 없음"}</p>
            <p>최대: {maxSpeed !== null ? `${maxSpeed} ms` : "기록 없음"}</p>
        </div>
    );
};


export default WebSocketClient;