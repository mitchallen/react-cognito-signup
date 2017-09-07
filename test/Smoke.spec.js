import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Chai from 'chai';

const expect = Chai.expect;

import CognitoSignup from '../src/index';

const updateUserToken = (token) => {
	// TODO
}

const aci = {

};

describe('CognitoSignup', () => {

  const renderer = new ShallowRenderer();
  renderer.render(<CognitoSignup  
    updateUserToken={updateUserToken}
    amazonCognitoIdentity={aci}
    cognitoUserPoolId='foo' 
    cognitoAppClientId='fubar' />);
  const result = renderer.getRenderOutput();


  it('root element should be a div', () => {
    // expect(wrapper.type()).to.eql('div');
    expect(result.type).to.eql('div');
  });

});