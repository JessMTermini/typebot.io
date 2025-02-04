import { z } from 'zod'
import { IntegrationStepType, stepBaseSchema } from '../shared'

const variableForTestSchema = z.object({
  id: z.string(),
  variableId: z.string().optional(),
  value: z.string().optional(),
})

const responseVariableMappingSchema = z.object({
  id: z.string(),
  variableId: z.string().optional(),
  bodyPath: z.string().optional(),
})

export const webhookOptionsSchema = z.object({
  variablesForTest: z.array(variableForTestSchema),
  responseVariableMapping: z.array(responseVariableMappingSchema),
  isAdvancedConfig: z.boolean().optional(),
  isCustomBody: z.boolean().optional(),
})

export const webhookStepSchema = stepBaseSchema.and(
  z.object({
    type: z.enum([IntegrationStepType.WEBHOOK]),
    options: webhookOptionsSchema,
    webhookId: z.string(),
  })
)

export const defaultWebhookOptions: Omit<WebhookOptions, 'webhookId'> = {
  responseVariableMapping: [],
  variablesForTest: [],
  isAdvancedConfig: false,
  isCustomBody: false,
}

export type WebhookStep = z.infer<typeof webhookStepSchema>
export type WebhookOptions = z.infer<typeof webhookOptionsSchema>
export type ResponseVariableMapping = z.infer<
  typeof responseVariableMappingSchema
>
export type VariableForTest = z.infer<typeof variableForTestSchema>
