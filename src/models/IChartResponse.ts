export interface ICoinResponce {
	Response: String
	Message: String
	HasWarning: Boolean
	Type: Number
	RateLimit: {}
	Data: {
		Aggregated: Boolean
		TimeFrom: Number
		TimeTo: Number
		Data: [
			{
				time: Number
				high: Number
				low: Number
				open: Number
				volumefrom: Number
				volumeto: Number
				close: Number
				conversionType: String
				conversionSymbol: String
			}
		]
	}
}
