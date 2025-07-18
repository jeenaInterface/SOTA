Feature: Vessel Schedule Management

@vesselSchedule
Scenario: Verify Add vessel functionalities with valid data
    Given Vessel schedule user logged into the application
    Then I am on the Vessel Schedule page
    When Click on Add Vessel button
    And Enter Vessel Name as "Cosco"
    # And Enter berth info, vessel info and week info
    # And Click on Save button
    # Then Verify success message is displayed for adding vessel
    # Then Verify remarks are added successfully
    # Then verify delete vessel functionalities
    # Then Verify View schedule View