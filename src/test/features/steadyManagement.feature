Feature: Steady Management

@Opsuser @Steady
Scenario: Search Steady management
    Given Go to steady management screen
    And Select vessel as operational type
    When Click on search button
    Then Verify the steadies are loaded in the table

@auth @Steady
Scenario: Create new Steady
    Given Select vessel as operational type
    When Click on search button
    Then Verify the steadies are loaded in the table
