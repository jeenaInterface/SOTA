Feature: Terminal Service Order by TR Management User - Create, Discard, Firm, Push to Summary Sheet, and Cancel Terminal Service

  @auth1
  Scenario: TR user creates a new Terminal service order and then discards the order
    Given the user creates a new Terminal service order
    Then the user discards the Terminal service order

  @auth1
  Scenario: TR user creates, firms, pushes to summary sheet, and cancels a Terminal service order
    Given the user creates a new Terminal service order
    Then the user firm the Terminal service order
    Then the user push the Terminal service order to the summary sheet
    Then the user cancel the Terminal service order
