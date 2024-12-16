describe('Carrinho', () => {

  beforeEach("load", function () {
    cy.fixture("carrinho").then((data) => {
      this.data = data;
    })
    cy.acessarSite()
  })

  it('Test Case 8: Verify All Products and product detail page', function () {
    //4. Click on 'Products' button
    //5. Verify user is navigated to ALL PRODUCTS page successfully
    cy.acessarMenu('Products', "All Products")

    //6. The products list is visible    
    //7. Click on 'View Product' of first product
    //8. User is landed to product detail page
    cy.get(this.data.elements["view-product1"]).should('be.visible').click()

    //9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
    cy.contains(this.data.inputs["product-name"]).should('be.visible')
    cy.contains(this.data.inputs["category"]).should('be.visible')
    cy.contains(this.data.inputs["price1"]).should('be.visible')
    cy.contains(this.data.inputs["availability"]).should('be.visible')
    cy.contains(this.data.inputs["condition"]).should('be.visible')
    cy.contains(this.data.inputs["brand"]).should('be.visible')

  });
  it('Test Case 12: Add Products in Cart', function () {

    //4. Click 'Products' button
    cy.acessarMenu('Products', 'All Products')

    //5. Hover over first product and click 'Add to cart'
    cy.get(this.data.elements["first-product"]).eq(0).click()

    //6. Click 'Continue Shopping' button
    cy.get(this.data.elements["button-continue"]).should('be.visible').click()

    //7. Hover over second product and click 'Add to cart'
    cy.get(this.data.elements["second-product"]).eq(0).click()

    //8. Click 'View Cart' button  
    cy.contains('Cart').click()

    //9. Verify both products are added to Cart
    cy.get(this.data.elements["cart-description2"]).then(produto => {
      expect(produto.text()).to.equal('Men > Tshirts');
    });
    cy.get(this.data.elements["cart-description1"]).then(produto => {
      expect(produto.text()).to.equal('Women > Tops');
    });

    // 10. Verify their prices
    cy.get(this.data.elements["cart-price2"]).then(produto => {
      expect(produto.text()).to.equal(this.data.inputs["price2"]);
    });
    cy.get(this.data.elements["cart-price1"]).then(produto => {
      expect(produto.text()).to.equal(this.data.inputs["price1"]);
    });
  })


})

