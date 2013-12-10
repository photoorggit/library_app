/**
 * Created with JetBrains RubyMine.
 * User: sandeep
 * Date: 12/9/13
 * Time: 7:27 PM
 * To change this template use File | Settings | File Templates.
 */
describe('assetModel', function(){
    it('assetModel to be defined',function(){
        var x =new pict();
        expect(x).toBeDefined()

    }),
    it('pictCollection to be defined', function(){
        var p = new pictCollection();
        expect(p).toBeDefined();
    }),
    it('pictCollection- model variable to be defined', function(){
        var p = new pictCollection();
        expect(p.model).toBeDefined();
    })


})
