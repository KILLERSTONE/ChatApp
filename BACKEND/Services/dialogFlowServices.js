import dialogflow from '@google-cloud/dialogflow';

const { SessionsClient } = dialogflow;

// Rest of your code

import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectId = 'gen-lang-client-0955205265'; // Replace with your project ID
const keyFilePath = path.join(__dirname, 'Chat-App', 'DialogFlowKey.json');

const sessionClient = new dialogflow.SessionsClient({ projectId, keyFilename: keyFilePath });

async function processLlmRequest(userId, message) {
  try {
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, userId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'en-US',
        },
      },
      queryParams: {
        contexts: [
          {
            name: `projects/${projectId}/agent/sessions/${userId}/contexts/user`,
            parameters: { fields: { username: { stringValue: userId } } }, // Use userId as placeholder
          },
        ],
      },
    };

    const [response] = await sessionClient.detectIntent(request);
    
    if (response && response.queryResult && response.queryResult.fulfillmentText) {
      return response.queryResult.fulfillmentText;
    } else {
      console.error('Failed to get fulfillment text from response:', response);
      return 'Sorry, I could not process your request at the moment.';
    }
  } catch (error) {
    console.error('Error processing LLM request:', error);
    return 'Sorry, an error occurred while processing your request.';
  }
}


export default { processLlmRequest };

