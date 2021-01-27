import Qunar, { OrderOpt } from '../src/index';
import dotenv from 'dotenv';
import phin from 'phin';

import startOfDay from 'date-fns/fp/startOfDay';
import endOfDay from 'date-fns/fp/endOfDay';

dotenv.config({
	path: `${__dirname}/../.env`,
});

const qunar = new Qunar({
	key: 'YEZm2SMFKHqKx8Fv98oJU5RiYWXdNO1N',
	baseUrl: 'http://k3sp.opentrade.qunar.com/api/ota',
});

describe('Qunar Integration Test', () => {
	it('should pass the assertions', async () => {
		const now = new Date();

		const queryResponse = await qunar.queryOrderList({
			fromDate: startOfDay(now),
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
	});
});
