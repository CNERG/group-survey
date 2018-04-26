function addMultipleChoice(form, questionData) {
  
    form.addMultipleChoiceItem()  
        .setTitle(questionData.title)  
        .setChoiceValues(questionData.choices)  
        .setRequired(questionData.required); 
    
}

function addTextItem(form, questionData) {
    
    form.addTextItem()  
        .setTitle(questionData.title)  
        .setRequired(questionData.required);  
}

// forceParam is a dummy parameter whose existence forces the UrlFetch to avoid caching
// still not sure this is working properly!
function gennerateGroupSurvey(forceParam) {
  
  // Get the questions from some source in JSON format
  var surveyQuestionsJSON = UrlFetchApp.fetch("https://raw.githubusercontent.com/CNERG/group-survey/master/questions.json");
 
  var surveyQuestionsList = JSON.parse(surveyQuestionsJSON)
  
  var numQuestions = surveyQuestionsList.length
  
  var form
  
  if (numQuestions > 0) {
      var formTitle = "Group Survey Form";  
      var form = FormApp.create(formTitle)  
          .setTitle(formTitle);  
      
      for (var i = 0; i < numQuestions; i++) {
          if (surveyQuestionsList[i].type == "multipleChoice") {
              addMultipleChoice(form, surveyQuestionsList[i])
          } else if (surveyQuestionsList[i].type == "text") {
              addTextItem(form, surveyQuestionsList[i])
          }
      }
  }
}
