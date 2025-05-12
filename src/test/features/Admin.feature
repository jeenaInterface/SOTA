Feature: Admin module
@supportdata
  Scenario: Update LO Reference supporting data
    Given TR user logged into the application
    Then select Supporting Data from the admin menu
    When Select LO_Reference from the type list
    And Click on the edit button
    And Click on the update button
    Then Verify the sucess message is displayed
