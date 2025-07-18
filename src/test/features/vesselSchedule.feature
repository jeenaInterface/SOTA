Feature: Vessel Schedule Management

@vesselSchedule
Scenario: Verify Add vessel functionalities with valid data
    Given Vessel schedule user logged into the application
    Then I am on the Vessel Schedule page
    And Schedule a vessel
    And Enter berth info, vessel info , week info and remarks
    And Click on Save button

    # Then Verify View schedule View