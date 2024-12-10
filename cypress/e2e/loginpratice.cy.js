describe('Caso de Teste - Login bem-sucedido Versão01', () => {
    it('Deve navegar até o site, fazer login e verificar login bem-sucedido', () => {
      // Abrir o navegador e navegar para a URL
      cy.visit('http://automationexercise.com');
  
      // Verificar se a página inicial é exibida com sucesso
      cy.get('body').should('contain', 'Full-Fledged practice website for Automation Engineers');
  
      // Clicar no botão 'Signup / Login'
      cy.contains('Signup / Login').click();
  
      // Verificar se 'Login to your account' está visível
      cy.get('h2').should('contain', 'Login to your account');
  
      // Inserir o endereço de e-mail e a senha corretos
      cy.get('input[data-qa="login-email"]').type('QA@email.com'); 
      cy.get('input[data-qa="login-password"]').type('QAFramework'); 
  
      // Clicar no botão 'login'
      cy.get('button[data-qa="login-button"]').click();
  
      // Verificar se 'Logged in as username' está visível
      cy.get('a').should('contain', 'Logged in as');
    });
  });
  
