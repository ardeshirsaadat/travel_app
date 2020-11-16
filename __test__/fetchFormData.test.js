
import {calculateDaysDifference} from "../src/client/js/fetchFormData"

test('the difference of two dates is as expected',()=>{
  expect(calculateDaysDifference("10-10-2020","10-12-2020")).toBe(2)
})
test('the difference of two dates is as expected',()=>{
  expect(calculateDaysDifference("10-10-2020","10-10-2021")).toBe(365)
})
test('the difference of two dates is as expected',()=>{
  expect(calculateDaysDifference("10-10-2020","10-13-2020")).toBe(3)
})