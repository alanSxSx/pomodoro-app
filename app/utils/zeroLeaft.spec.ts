import { zeroLeft } from "./zeroLeaft"

describe('Zero Leaft', () => {

    it('should add zero leaft', () => {
        expect(zeroLeft(1)).toBe('01')
        expect(zeroLeft(2)).toBe('02')
        expect(zeroLeft(3)).toBe('03')

        expect(zeroLeft(4)).not.toBe('4')
        expect(zeroLeft(5)).not.toBe('5')
        expect(zeroLeft(6)).not.toBe('6')

        
    })
    


})