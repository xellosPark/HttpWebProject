[TCP Header] + [Payload (abc)]

Frame 1: 74 bytes on wire (592 bits)
Ethernet Header
IP Header
TCP Header
Data: 61 62 63 (abc)

📌 예제 요청 (GET 요청)

GET / HTTP/1.1
Host: 127.0.0.1:5003
Connection: keep-alive
User-Agent: React-WebClient
Accept: _/_
📌 예제 요청 (POST 요청)

POST / HTTP/1.1
Host: 127.0.0.1:5003
Connection: keep-alive
Content-Type: application/json
Content-Length: 17

{"message": "abc"}

서버: 일반 TCP 통신 프로그램 (HelloDevice UniversalComm)
클라이언트: React에서 HTTP(1.1) 방식으로 통신
목표: React 클라이언트가 HTTP 1.1 요청을 TCP 서버(127.0.0.1:5003) 에 전송하고, 응답을 수신하는 방식 구현

2. React에서 HTTP 요청을 직접 TCP로 보내기
   기본적인 HTTP 요청은 fetch()를 사용하면 안 되고, TCP 소켓을 직접 열어서 HTTP 요청을 전송해야 해.
   React에서 TCP 소켓 통신을 하려면 net.Socket을 사용하는데, 이건 브라우저 환경에서는 지원되지 않음.
   따라서 Node.js 환경에서 실행해야 하며, React에서 직접 사용할 수 없음. ** 중요 **
   하지만 React에서 Express 서버를 통해 중계하면 가능해!

3. 해결 방법
   React는 일반 HTTP 요청 (fetch())을 사용하여 Express 서버로 요청
   Express 서버는 TCP 소켓을 열어 HTTP 1.1 메시지를 TCP 서버(127.0.0.1:5003)에 직접 전송
   TCP 서버에서 HTTP 형식의 응답을 받으면 React로 다시 전달
