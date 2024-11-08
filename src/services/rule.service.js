'use strict';

const { BadRequestError, NotFoundError } = require('../core/error.response');
const conclusionModel = require('../models/conclusion.model');
const ruleModel = require('../models/rule.model');
const {
	formatDescription,
	parseDescriptionToEventsAndConclusion,
	isSubset,
} = require('../utils');

class RuleService {
	static getAllRule = async () => {
		return await ruleModel.find({}).lean();
	};

	static getRuleById = async (ruleId) => {
		return await ruleModel.findOne({ ruleId: ruleId }).lean();
	};

	static createNewRule = async ({ description, conclusion, ...rule }) => {
		// Lấy rule cuối cùng từ database
		const lastRule = await ruleModel.findOne().sort({ ruleId: -1 });

		// Xác định số thứ tự mới
		let newRuleIdNumber = 1; // Mặc định là 1 nếu không có rule nào trong DB
		if (lastRule && lastRule.ruleId) {
			// Lấy số thứ tự từ ruleId cuối cùng
			const lastRuleNumber = parseInt(lastRule.ruleId.slice(1), 10);
			newRuleIdNumber = lastRuleNumber + 1;
		}

		// Tạo ruleId mới
		const newRuleId = `L${newRuleIdNumber}`;

		// Xử lý description thành dạng "(M1^M2) -> KL=KL+1"
		const klValue = conclusion;
		const formattedDescription = formatDescription(description, klValue);

		// Tạo rule mới với ruleId tự động và description đã xử lý
		const newRule = await ruleModel.create({
			ruleId: newRuleId,
			description: formattedDescription,
			...rule,
		});

		if (!newRule) {
			throw new BadRequestError('Thêm sự kiện thất bại!');
		}
		return newRule;
	};

	static getConsultance = async (eventData) => {
		const foundRules = await ruleModel
			.find({})
			.select({ ruleId: 1, description: 1 })
			.lean();
		const parsedRules = foundRules.map((rule) => ({
			...rule,
			parsedDescription: parseDescriptionToEventsAndConclusion(
				rule.description
			),
		}));
		let currentEventData = eventData.events;
		while (currentEventData.length > 0) {
			const matchingRule = parsedRules.find((rule) => {
				const { events, conclusion } = rule.parsedDescription;
				console.log({ events, conclusion });
				return isSubset(events, currentEventData);
			});
			if (matchingRule) {
				const { conclusion } = matchingRule.parsedDescription;
				console.log(
					`Found matching rule, replacing events with conclusion: ${conclusion}`
				);
				const { events } = matchingRule.parsedDescription;
				currentEventData = currentEventData.filter(
					(event) => !events.includes(event)
				);
				currentEventData.push(conclusion);
				console.log('CURRENT::', currentEventData[0]);
				if (currentEventData.length === 1) {
					const finalResult = await conclusionModel.findOne({
						conclusionId: currentEventData[0],
					});
					return finalResult || { description: 'Không có kết quả phù hợp.' };
				}
			} else {
				const conclusions = await Promise.all(
					currentEventData.map(async (conclusionId) => {
						const conclusion = await conclusionModel.findOne({ conclusionId });
						return conclusion ? conclusion.description : null;
					})
				);
				const finalDescriptions = conclusions.filter(Boolean).join(', ');
				return {
					description: finalDescriptions || 'Không có kết quả phù hợp.',
				};
			}
		}
		return {
			description: 'Không có kết quả phù hợp.',
		};
	};

	// * TH1
	// * Sự kiện đưa vào ["M2", "M5", "A1"]
	// * Tìm tất cả trong các luật sau khi đã đưa về mảng xem có luật nào có cả 3 sự kiện trên hay không nếu không có thì thực hiện bước dưới
	// * Sự kiện có ["M2", "M5"] là con của sự kiện đưa vào (theo L1: M5 ^ M2 -> KL1)
	// * Thay KL1 vào mảng sự kiện đưa vào: ["KL1", "A1"]
	// * Tiếp tục xét tiếp trong tập luật có L26: KL1 ^ A1 -> Kl26
	// * Thay vào mảng sự kiện hiện tại ["KL26"]
	// * Kết thúc và đưa ra mô tả kết luận

	// * TH2
	// * Sự kiện đưa vào ["M2", "M5", "H3"]
	// * Tìm trong các luật có luật L1: M2 ^ M5 -> KL1 và L27: H3 -> KL27
	// * Tiếp tục tìm trong luật
	// * Nếu không có thì kết hợp KL1 và KL27 là một kết luận mới
}

module.exports = RuleService;
