import { CUSTOM_All_TEMPLATE_IDS, CUSTOM_All_SCENE_IDS } from "@qunhe/brandgoods-templates-config";
import { ELibTemplateId, ESceneId, ELibId } from "@qunhe/types-brandgoods";
import { ELibBelong, IFetchGoodsParams } from "../domains/goods-domain";

/**
 * 根据当前参数判断是否需要获取定制相关数据
 * - true, 则需要传递 `dingzhi: 1` 以获取 `dingZhiExtraData` 字段
 * - false, 无需处理
 * @param {IFetchGoodsParams} param 
 * @returns {boolean} 是否需要获取定制相关数据
 * @default false
 */
export const isNeedDingzhiExtraData = (param: IFetchGoodsParams) => {
    if (param.libBelong === ELibBelong.enterprise) {
        // 定制以及顶墙定制的线条库、参数化模型库都需要支持获取 dingzhi 字段数据 (报价分类等)
        if (
            param.sceneId &&
            (
                [...CUSTOM_All_TEMPLATE_IDS, ...CUSTOM_All_SCENE_IDS].includes(param.sceneId) ||
                (
                    [
                        ELibTemplateId.topwallCustom,
                        ESceneId.topWallCustom
                    ].includes(param.sceneId as ELibTemplateId) &&
                    [
                        ELibId.topwallCustomContours,
                        ELibId.topwallCustomFrontParametricModel,
                        ELibId.topwallCustomBackendInternalComponent
                    ].includes(param.libId as ELibId)
                )
            )
        ) {
            return true;
        }
    }

    return false;
};


// BP 建议：
// 通用逻辑可放在 utils 中处理，后续维护时直接更新此方法即可
// 函数方法尽可能保证纯净，职责单一
// 写好 jsdoc, 便于查阅和后续维护
