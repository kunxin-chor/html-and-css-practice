
This is a HTML/CSS/JavaScript question bank.
The interface has a two-column layout:

**Layout Structure:**
- Left column: Code Editor
  - Tabbed interface for each file (HTML, CSS, JavaScript)
  - Syntax highlighting for all languages
  - Auto-saves
- Right column: Preview/Test/Question panel
  - Tabbed interface to switch between Preview, Test, and Question views
  - Preview tab: shows rendered output with console
  - Test tab: shows test results and errors
  - Question tab: shows question description, solution, and walkthrough

**Interface Components:**
1. Question selection (collapsible, group by category)
- show indiciator for questions that have been done correct
- show indiator for questions that has been done incorrectly
- no indicator for question not tried yet   
2. Question Display
 - display the question in the Question tab of the right panel
3. Answer Display (Code Editor - Left Column)
 - Tabbed interface for HTML (index.html), CSS (style.css), and JavaScript (script.js)
 - Syntax highlighting for all languages
 - Auto-saves
4. Preview (Preview Tab - Right Column)
- Show the rendered HTML and CSS code
- Execute JavaScript code in the preview
- Have a button to refresh the preview. Make it look like a real web browser if possible
- Display console output (logs, errors, warnings) from JavaScript execution
- Provide a console panel to view and interact with JavaScript console messages
5. Run Test (Test Tab - Right Column)
- Show the requirements
- For each requirement, check if pass or fail
- Show the requirements that have failed
- Show errors from linters or css validators
- Show JavaScript syntax errors and runtime errors
- Show JavaScript linting warnings and errors (e.g., ESLint)
- Have a button to run test or to rerun test
6. Display proposed solution (in Question tab)
7. Display walkthrough (in Question tab)

Question storage:
Use a JSON file to store all the questions as an array of objects. 
However, question authoring is done via a md file for each question. 
- one folder for each cateogry of question
- one md file for each question
- each md file is numbered like 001-basic-html.md, 002-add-css.md etc.
- each md file is in the /questions folder
- each folder in the /questions folder is one category
- each category must begin with a three digits number, such as`001`, or `002` for ordering
- each md file use the following headers to indicate different parts of the question:

  - # Question 
  - # Test Cases: the actual code to test if the answer is correct, written using a testing library that works in the browser. Use code fences ``` to seperate each test case. Example:    
    ```
    describe('Test 1', () => {
      it('should have one <h1> tag', () => {
        expect(true).toBe(true);
      });
    });
    ```
  - # Starting Files
  - ## HTML
  - ## CSS
  - ## JavaScript
  - ## Hints
  - # Solution
  - # Walkthrough: step by step guide, with pesudeo code or hint, to guide the student

Write a NodeJS script to convert the md files to JSON files.

Testing should be done via a testing library that be can ran within the browser.

Use a lint or similiar tool to check the student's submitted HTML, CSS, and JavaScript for errors


Stack: React, react-bootstrap, SPA, localstorage saving

Architecture
- React
- Jotai
- Single source of truth in a Jotai state (one for questions, one for student progress)
- Use components - avoid file with too many lines
- Use reducers
- Use wouter
- Architecture: clean architecture with separation of concerns
- Storing of data: must be resistant to changes -- adding new questions, changing the order of questions. Suggestion: use an unique ID system per question to store progress. Do not rely on ordering, category numbers, or file names, or question number
- Keep interface streamlined and concise
- md file of the same name should generate the same question id. 
