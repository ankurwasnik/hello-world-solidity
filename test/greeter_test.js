const GreeterContract = artifacts.require('Greeter');

contract('Greeter',(accounts)=>{
    it('is deployed',async()=>{
        const greeter = await GreeterContract.deployed();
        assert(greeter,'Greeter contract is not deployed');
    });
    describe('Greeting settings',()=>{
        let greeter;
        beforeEach(async()=>{
            greeter = await GreeterContract.deployed();
        });

        it('gets the current greeting',async()=>{
            let newGreeting = await greeter.getGreeting(); 
            assert.equal(newGreeting,'','greeting should match');
        });
        it('sets the greeting',async()=>{
            let newGreeting = 'Hello Ankur' ;
            await greeter.setGreeting(newGreeting,{from:accounts[0]});
            let actualGreeting = await greeter.getGreeting();
            assert.equal(newGreeting,actualGreeting,'greeting should match');
        });
    });
    describe('Access control',()=>{
        let greeter ;
        beforeEach(async()=>{
            greeter = await GreeterContract.deployed();
        });
        it('checks owner',async()=>{
            let owner = await greeter.getOwner();
            assert.equal(owner,accounts[0],'owner should match');
        });
        it('changes greeting only by owner',async()=>{
            try{
                let newGreeting = 'hell0';
                await greeter.setGreeting(newGreeting,{from:accounts[0]});
            }
            catch(err){
                
            }
        });
        it('greeting not changed by other accounts',async()=>{
            try{
                await greeter.setGreeting('hell0',{from:accounts[1]});
                assert(fail,'greeting should not update');
            }
            catch(err){
                let error = "Ownable: owner should match";
                assert.equal(err.reason,error,'greeting should not update');
                return;
            }
        });
    });
});
