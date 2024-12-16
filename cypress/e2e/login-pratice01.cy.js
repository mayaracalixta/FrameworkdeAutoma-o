

describe('Caso de Teste - Login bem-sucedido Versão01', () => {
    it('Deve navegar até o site, fazer login e verificar login bem-sucedido', () => {
      // Abrir o navegador e navegar para a URL
      cy.visit('http://automationexercise.com');
  
      // Verificar se a página inicial é exibida com sucesso
      cy.get('body').should('contain', 'Full-Fledged practice website for Automation Engineers');
  
      // Clicar no botão 'Signup / Login'
      cy.contains('Signup / Login').click();
  
      // Verificar se 'Login to your account' está visível
      cy.contains('Login to your account').should('be.visible');
  
      // Inserir o endereço de e-mail e a senha corretos
      cy.get('[data-qa="login-email"]').type('QA@email.com'); 
      cy.get('[data-qa="login-password"]').type('QAFramework'); 
  
      // Clicar no botão 'login'
      cy.get('[data-qa="login-button"]').click();
  
      // Verificar se 'Logged in as username' está visível
      cy.contains('Logged in as').should('be.visible');
    

    });
  });
