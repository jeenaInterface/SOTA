Feature: User Authentication tests

  Background:
    Given User navigates to the application

@login
  Scenario: Login should be success
    When User enter the username and password
    When User click on the login button
    Then user click on logout button 

