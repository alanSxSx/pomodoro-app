describe('Pomodoro Timer Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Should start working and update timer', () => {
    cy.contains('Working').click()
    cy.get('h2').should('have.text', 'Você está: Trabalhando')
    cy.wait(1000)
    cy.get('[data-testid="pomodoro-timer"]').should('exist')
  })

  it('Should pause and resume the timer', () => {
    cy.contains('Working').click()
    cy.wait(1000)
    cy.contains('Pause').click()
    cy.get('button').contains('Play')
    cy.contains('Play').click()
    cy.get('button').contains('Pause')
  })

  it('Should switch to rest time after working time is over', () => {
    cy.contains('Working').click()
    cy.wait(5000)
    cy.get('[data-testid="pomodoro-timer"]').should('contain', 'Descansando')
  })

  it('Should play the start working audio', () => {
    cy.contains('Working').click()
    cy.get('audio[data-testid="audio-start-working"]').should('have.prop', 'paused', false)
  })

  it('Should play the finish working audio', () => {
    cy.contains('Working').click()
    cy.wait(5000)
    cy.get('audio[data-testid="audio-finish-working"]').should('have.prop', 'paused', false)
  })

  it('Should update completed cycles and pomodoros', () => {
    cy.contains('Working').click()
    cy.wait(5000)
    cy.get('[data-testid="pomodoros-concluidos"]').should('have.text', 'Pomodoros Concluídos: 1')
    cy.wait(5000)
    cy.get('[data-testid="ciclos-concluidos"]').should('have.text', 'Ciclos Concluídos: 0')
  })

  it('Should display the correct working hours', () => {
    cy.contains('Working').click()
    cy.wait(5000)
    cy.get('[data-testid="horas-trabalhadas"]').should('contain', 'Horas Trabalhadas: 00:00:05')
  })
})
