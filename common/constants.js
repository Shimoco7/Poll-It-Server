module.exports = Object.freeze({


  // SCHEMAS
  ACCOUNT: "Account",
  ANSWER: "Answer",
  DETAIL: "Detail",
  DETAIL_QUESTION: "DetailQuestion",
  POLL: "Poll",
  POLL_QUESTION: "PollQuestion",
  REWARD: "Reward",
  ORDER: "Order",


  //AUTH
  USER: "User",
  CLIENT: "Client",
  ADMIN: "Admin",
  BEARER: "Bearer",
  AUTHORIZATION: "Authorization",



  //MAX UNRELIABILITY RANK
  MAX_UNRELIABILITY_RANK: 9,

  //ERROR MESSAGES
  MAX_UNRELIABILITY_RANK_ERROR_MSG: "Account unreliability rank is too high, the account is blocked.",

  //STORAGE
  STORAGE_PATH: "storage/images/",


  //CER
  CER_PATH: '/CSSTUD/CSSTUD.pfx',


  //detailQuestions
  AGE: "age",
  EDUCATION_LEVEL: "educationLevel",
  GENDER: "gender",
  MARITAL_STATUS: "maritalStatus",
  NUMBER_OF_CHILDRENS: "numberOfChildrens",
  PERMANENT_JOB: "permanentJob",
  INCOME: "income",


  //detailQuestionMap
  DETAIL_QUESTION_MAP: Object.freeze({
    "Age": "age",
    "Education Level": "educationLevel",
    "Gender": "gender",
    "Marital Status": "maritalStatus",
    "Number of Childrens": "numberOfChildrens",
    "Permanent Job": "permanentJob",
    "Income per Month (NIS)": "income"
  }),
  
  
    //TESTS
    TEST_EMAIL: "test@unittest.com",
    TEST_EMAIL2: "test@unittest2.com",
    TEST_PASSWORD: "Test1234@",
    TEST_QUESTION: "test question?",
    TEST_ANSWER: "test answer",
    TEST_ID: "4eb6e7e7e9b7f4194e000003",
    TEST_ID2: "4eb6e7e7e9b7f4194e000004",
    TEST_POLL_NAME: "Test Poll",
    TEST_POLL_QUESTION_TYPE: "Multi Choice",
    TEST_FACEBOOKID: "123123123",
    TEST_DETAIL_QUESTION: "Gender",
    TEST_DETAIL_QUESTION_ID: "62694e77617a7539e71ef072",
    TEST_REWARD_TITLE: "title",
    TEST_REWARD_DESCRIPTION: "description",
    TEST_REWARD_PRICE: 0
});