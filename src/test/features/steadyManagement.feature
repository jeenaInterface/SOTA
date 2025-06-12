Feature: Steady Management


  @steady
  Scenario: Steady Management - Create, Update,reset, download and Search Steady
    Given TR user logged into the application
    Then Go to steady management screen
    # And Select vessel as operational type
    # And Select steady name as "38895"
    # When Click on search button
    # Then Verify the steady details are displayed in the table
    # Then Verify update steady functioanlities
    # Then click on back button
    # And Select vessel as operational type
    # And Select steady name as "38895"
    # When Click on search button
    # Then Click on reset button
    # And Verify the steady name field is empty
    Then Click on create new steady button
    And Verify new steady is created or proper message is displayed
    Then Enter a wrong steady name in the search box
    When Click on search button
    Then Confirm validation message is displayed
    Then Verify the download report is downloaded successfully
    Then Verify the steady report is downloaded successfully

