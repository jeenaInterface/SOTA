Feature: Steady Management

  Background:
    Given User navigates to the application
    When TR management User enter the username and password
    When User click on the login button

@Steadymanagement1
Scenario: Update a steady details
    Given Go to steady management screen
    And Select vessel as operational type
    When Click on search button
    Then Update the details for the First Steady in the table and confirm the success message.