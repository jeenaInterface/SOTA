Feature: Steady Management


  @sanity
  Scenario: Steady Management - search, Update,reset functionalities
    Given TR user logged into the application
    Then Go to steady management screen
    And Select vessel as operational type
    And Select steady name as "38895"
    When Click on search button
    Then Verify the steady details are displayed in the table
    Then Verify update steady functioanlities
    Then click on back button
    And Select vessel as operational type
    And Select steady name as "38895"
    When Click on search button
    Then Click on reset button
    And Verify the steady name field is empty


# @validation
#   Scenario: Steady Management - Validation checks
#     Given TR user logged into the application
#     Then Go to steady management screen
#     Then Click on create new steady button
#     Then Verify the validation for shift, steady name and other required fields

  @sanity
  Scenario: Steady Management - Download Report
    Given TR user logged into the application
    Then Go to steady management screen
    Then Verify the download report is downloaded successfully  
    Then Verify the steady report is downloaded successfully