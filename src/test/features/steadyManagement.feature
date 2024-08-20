Feature: Steady Management

  Background:
    Given User navigates to the application
    When TR management User enter the username and password
    When User click on the login button

@Steadymanagement
Scenario: Search Steady management
    Given Go to steady management screen
    And Select vessel as operational type
    When Click on search button
    Then Verify the steadies are loaded in the table

@Steadymanagement
Scenario: Create new Steady
    Given Select vessel as operational type
    When Click add steady button
    Then Enter mandatory field and click on save button
    Then Verify the success message

@Steadymanagement
Scenario: Verify download Report functionality
    Given Click on download report
    When Verify the report downloaded1