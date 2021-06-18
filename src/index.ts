import format from 'date-fns-tz/format';
import CryptoJS from 'crypto-js';
import phin from 'phin';
import querystring from 'query-string';

import { Currency } from './currency';

export type QunarConstructorInput = {
	key: string;
	baseUrl?: string;
};

export type QueryOrderListRequest = {
	fromDate: Date;
	toDate: Date;
	version: string;
};

export enum OrderStatusCode {
	WAITING_PAYMENT = 1,
	WAITING_ROOM_CONFIRM = 2,
	FAILED = 3,
	WAITING_ROOM_ARRANGE = 5,
	CANCELLED = 6,
	ROOM_ARRANGE_SUCCESSFUL = 7,
	ORDER_FINISHED = 12,
	PAYMENT_CANCEL_PROCESSING = 13,
	PAYMENT_CANCEL_SUCCESSFUL = 15,
	PAID_AND_WAITING_ROOM_CONFIRM = 29,
	PAID_AND_ROOM_CONFIRM_FAILED = 42,
}

export enum PayTypeCode {
	PREPAY = 0,
	PAYNOW,
}

export enum PromotionCode {
	NONE = 'NONE',
	REDPACKET = 'REDPACKET',
}

export enum VouchType {
	HAS_VOUCH = 1,
	NO_VOUCH,
}

export enum VouchCancel {
	YES = 1,
	NO,
}

export enum FaxStatus {
	SEND_SUCCESS = 'SEND_SUCCESS',
	SEND_FAIL = 'SEND_FAIL',
	SENDING = 'SENDING',
	BACK_SUCCESS = 'BACK_SUCCESS',
	BACK_EXCEPTION = 'BACK_EXCEPTION',
}

export enum OrderBlackInfo {
	NORMAL = 'normal',
	REPORTED = 'reported',
	BLACK = 'black',
}

export enum PromotionValid {
	ACTIVE_AFTER_CHECKING_IN = 1,
	ACTIVE_AFTER_CHECKING_OUT,
	ACTIVE_WHEN_STAYING,
}

export enum OrderStatus {
	NEW_ORDER = 'NEW_ORDER',
	CONFIRMING = 'CONFIRMING',
	CONFIRMED = 'CONFIRMED',
	CANCELLED = 'CANCELLED',
	REJECTED = 'REJECTED',
	CHECKED_IN = 'CHECKED_IN',
	CHECKED_OUT = 'CHECKED_OUT',
	NO_SHOW = 'NO_SHOW',
	DELETE = 'DELETE',
}

export enum PayStatus {
	PAY = 'PAY',
	PAY_SUCCESS = 'PAY_SUCCESS',
	GUARANTEE_SUCCESS = 'GUARANTEE_SUCCESS',
	UNFREEZE_SUCCESS = 'UNFREEZE_SUCCESS',
	REFUND_SUCCESS = 'REFUND_SUCCESS',
	GUARANTEE_REVOKE_SUCCESS = 'GUARANTEE_REVOKE_SUCCESS',
	GUARANTEE_CONFIRM_SUCCESS = 'GUARANTEE_CONFIRM_SUCCESS',
}

export type Fax = {
	faxAction: string;
	faxContentUrl: string;
	faxSuccessTime: string;
	faxStatus: FaxStatus;
};

export type Promotion = {
	validType: PromotionValid;
	name: string;
	description: string;
};

export type CallCenterTicket = {
	action?: string;
	note?: string;
	time?: string;
	createTime?: string;
};

export type QorderInfo = {
	qhotelName?: string;
	qroomName?: string;
};

export type QuserInfo = {
	userId?: string;
};

export type Membership = {
	cardNo?: string;
	name?: string;
	mobile?: string;
	idCard?: string;
	level?: string;
};

export type Order = {
	orderNum: string;
	statusCode: OrderStatusCode;
	statusMsg: string;
	payTypeCode: PayTypeCode;
	payTypeMsg: string;
	roomNum: number;
	payMoney: number;
	cityName: string;
	hotelId: string;
	roomId: string;
	hotelName: string;
	roomName: string;
	orderDate: string;
	checkInDate: string;
	checkOutDate: string;
	customerName: string;
	contactName: string;
	contactPhone: string;
	contactEmail?: string;
	request?: string;
	remark?: string[];
	customerIp?: string;
	everyDayPrice: string;
	originEveryDayPrice?: string;
	promotionCode?: PromotionCode;
	redPacketMoney?: number;
	cashBackMoney?: number;
	breakfast?: string;
	isVouch?: VouchType;
	vouchMoney?: number;
	changeRule?: VouchCancel;
	lastCancelTime?: string;
	bedType?: string;
	contactPhoneKey?: string;
	channel?: string;
	foreignCurrencyAmount?: number;
	currencyType?: Currency;
	faxList?: Fax[];
	arriving?: boolean;
	promotionList?: Promotion[];
	phoneAttribution?: string;
	lastUpdateTime?: number;
	instantConfirm?: boolean;
	orderRefundMoney?: number;
	roomFee?: number;
	refundRoomFee?: number;
	totalBasePrice: number;
	orderBlackInfo?: OrderBlackInfo;
	keyTimes: {
		payTime?: string;
		refundTime?: string;
		unfreezeTime?: string;
	};
	distributeChannel?: string;
	distributeChannelOrderId?: string;
	orderStatus?: OrderStatus;
	payStatus?: PayStatus;
	ccInfo?: CallCenterTicket[];
	otaOrderId?: string;
	qorderInfo?: QorderInfo;
	quserInfo?: QuserInfo;
	amended?: boolean;
	priceFrom?: string;
	extra?: { [key: string]: any };
	membership?: Membership;
};

export type QueryOrderListResponse = {
	ret: boolean;
	errCode: string;
	errMsg?: string;
	data?: Order[];
	totalSize: number;
};

export enum OrderOpt {
	CONFIRM_ROOM_SUCCESS = 'CONFIRM_ROOM_SUCCESS',
	CONFIRM_ROOM_FAILURE = 'CONFIRM_ROOM_FAILURE',
	ARRANGE_ROOM = 'ARRANGE_ROOM',
	ADD_REMARKS = 'ADD_REMARKS',
	APPLY_UNSUBSCRIBE = 'APPLY_UNSUBSCRIBE',
	AGREE_UNSUBSCRIBE = 'AGREE_UNSUBSCRIBE',
	REFUSE_UNSUBSCRIBE = 'REFUSE_UNSUBSCRIBE',
	CONFIRM_SHOW = 'CONFIRM_SHOW',
	CONFIRM_NOSHOW = 'CONFIRM_NOSHOW',
	AGREE_CASHBACK = 'AGREE_CASHBACK',
	SEND_FAX = 'SEND_FAX',
	SEND_SMS = 'SEND_SMS',
	CC_REPLY = 'CC_REPLY',
	ORDER_CHANGE = 'ORDER_CHANGE',
}

export enum ArrangeType {
	NUMBER = 'NUMBER',
	NAME = 'NAME',
}

export enum ChargeSettlement {
	ONLINE = 'ONLINE',
	DEBT = 'DEBT',
	CASH = 'CASH',
}

export type OptOrderRequest = {
	orderNum: string;
	opt: OrderOpt;
	arrangeType?: ArrangeType;
	confirmationNumber?: string;
	money?: number;
	remark?: string;
	faxSendPartnerName?: string;
	faxStamp?: string;
	faxReceiveName?: string;
	faxReceiveFaxNumber?: string;
	faxSender?: string;
	faxSenderTelNumber?: string;
	faxReceiver?: string;
	faxReceiverTelNumber?: string;
	faxSendType?: string;
	prices?: string;
	roomChargeSettlement?: ChargeSettlement;
	otherChargeSettlement?: ChargeSettlement;
	smsContent?: string;
	note?: string;
	otaOrderId?: string;
};

export type OptOrderResponse = {
	ret: boolean;
	statusCode?: OrderStatusCode;
	statusDesc: string;
	errorMsg: string[];
	errMsg?: string;
};

export type PriceChangesRequest = {
	otaHotelId: string;
	fromDate: string;
	toDate: string;
}[];

export type PriceChangesResponse = {
	status?: number;
	errorCode?: string;
	errorMsg?: string;
};

type Request = {
	url: string;
	parameters: object;
	signature: string;
	method: 'GET' | 'POST';
};

export default class Qunar {
	private key: string;
	private baseUrl: string;

	constructor(input: QunarConstructorInput) {
		const { key, baseUrl = '' } = input;
		this.key = key;
		this.baseUrl = baseUrl;
	}

	private signature(propertyStr: string): string {
		propertyStr = `${this.key}${propertyStr}`;

		return CryptoJS.MD5(propertyStr).toString();
	}

	private async request(request: Request) {
		const { url, parameters, signature, method } = request;

		let response: phin.IResponse | null;
		const param = {
			...parameters,
			hmac: this.signature(signature),
		};
		switch (method) {
			case 'GET':
				response = await phin(
					`${this.baseUrl}${url}?${querystring.stringify(param)}`
				);
				break;
			default:
				console.log({
					url: `${this.baseUrl}${url}`,
					method,
					data: param,
				});
				response = await phin({
					url: `${this.baseUrl}${url}`,
					method,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					data: querystring.stringify(param),
				});
				break;
		}
		const { statusCode, body } = response;
		if (!statusCode || statusCode < 200 || statusCode >= 400) {
			throw new Error(body);
		}

		return JSON.parse(body);
	}

	async queryOrderList(
		request: QueryOrderListRequest
	): Promise<QueryOrderListResponse> {
		const { fromDate, toDate, version } = request;
		const parameters = {
			fromDate: format(fromDate, 'yyyyMMddHHmmss'),
			toDate: format(toDate, 'yyyyMMddHHmmss'),
			version,
		};
		return await this.request({
			url: '/api/ota/otaQueryOrder',
			parameters,
			signature: `${parameters.fromDate}${parameters.toDate}${version}`,
			method: 'GET',
		});
	}

	async optOrder(request: OptOrderRequest): Promise<QueryOrderListResponse> {
		const { orderNum, opt } = request;
		const signature = [
			'money',
			'arrangeType',
			'confirmationNumber',
			'faxSendPartnerName',
			'faxReceiveFaxNumber',
			'faxSendType',
			'prices',
			'roomChargeSettlement',
			'otherChargeSettlementOptOrderRequest',
		].reduce((prev, key) => {
			const requestForDataRetrieval: { [key: string]: any } = request;
			const value: any = requestForDataRetrieval[key];

			return `${prev}${(value || '').toString()}`;
		}, `${orderNum}${opt}`);

		return await this.request({
			url: '/api/ota/otaOpt',
			parameters: request,
			signature,
			method: 'GET',
		});
	}

	async priceChanges(
		request: PriceChangesRequest
	): Promise<PriceChangesResponse> {
		const hotelIds = request.reduce((prev, { otaHotelId }) => {
			return `${prev},${(otaHotelId || '').toString()}`;
		}, '');

		return await this.request({
			url: '/ota/changeprice/norm/param/push?format=json&type=update_hotel',
			parameters: {
				content: JSON.stringify({ changeInfoList: request }),
			},
      signature: hotelIds,
			method: 'POST',
		});
	}
}
