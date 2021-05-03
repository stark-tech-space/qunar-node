import Qunar, { OrderOpt } from '../src/index';
import dotenv from 'dotenv';

import startOfDay from 'date-fns/fp/startOfDay';
import endOfDay from 'date-fns/fp/endOfDay';
import subDays from 'date-fns/fp/subDays';

dotenv.config({
	path: `${__dirname}/../.env`,
});

const qunar = new Qunar({
	key: 'YEZm2SMFKHqKx8Fv98oJU5RiYWXdNO1N',
	baseUrl: 'http://k3sp.opentrade.qunar.com',
});

describe('Qunar Integration Test', () => {
	it('should pass the assertions', async () => {
		const now = new Date();

		const queryResponse = await qunar.queryOrderList({
			fromDate: startOfDay(subDays(6, now)),
			toDate: endOfDay(now),
			version: '3.7',
		});

		console.log(queryResponse);
		expect(queryResponse).toBeDefined();

		const optOrderResponse = await qunar.optOrder({
			orderNum: '4544656465',
			opt: OrderOpt.ADD_REMARKS,
			remark: 'hello i am a remark',
		});

		console.log(optOrderResponse);
		expect(optOrderResponse).toBeDefined();

		// const priceChanges = await qunar.priceChanges([
		// 	{
		// 		otaHotelId: 'fsjfposdf',
		// 		fromDate: '2021-06-12',
		// 		toDate: '2021-06-14',
		// 	},
		// ]);

		// console.log(priceChanges);
		// expect(priceChanges).toBeDefined();
	});
});
