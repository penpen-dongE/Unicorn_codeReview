//익스프레스 인스턴스가 하나의 서버역할을 하는데
//크게 보면 서버를 세팅하고 서버를 구동하는 역할을 함
//서버세팅== 서버에 필요한 기능을 추가
const express = require("express")
const app = express()
const dialogflow = require('dialogflow').v2beta1;
const uuid = require('uuid');
const fs = require('fs')
// 이게 있어야 req.body를 사용할 수 있습니다
app.use(express.json())


/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(projectId = 'bandibot-beta1-ycnrog') {
  // A unique identifier for the given session
  //const sessionId = uuid.v4();
    const keyfile = JSON.parse(fs.readFileSync('C:/Users/USER/nodejs_api_sever/bandibot-beta1-d16cf765d090.json'))
    const privateKey = keyfile['private_key']
    const clientEmail = keyfile['client_email']
    let sessionId = '123456'
    let config = {
        credentials: {
            private_key: privateKey,
            client_email: clientEmail
        }
    }

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient(config);
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        // user의 질문이 들어가야 합니다.!!!!!!!!
        // 어떻게 연결할 수 있을까요???????????!!!!!
        text: '반딧봇과 서버를 연결해서 브라우저에 띄워줘!!!! 서버에서 입력했습니다.', 
        // The language used by the client (en-US)-->한국어로 변경
        languageCode: 'ko',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
}
runSample();
//익스프레스 인스턴스의 listen() 함수를 이용해 
//서버가 클라이언트의 요청대기 상태로 들어감
//첫번째 파라미터 8000이 대기할 포트 번호
//두번째 파라미터 함수 listen()이 완료되면 실행되는 콜백함수.
const server = app.listen(8000, () => {
    console.log("Server is running.")
  })