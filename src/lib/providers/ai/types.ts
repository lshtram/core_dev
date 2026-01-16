/**
 * AI Provider Interface
 * 
 * Abstraction layer for AI/LLM interactions.
 * Implementations: OpenAIProvider, AnthropicProvider, MockProvider
 */

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface AIResponse {
  text: string
  raw: unknown
}

export interface Task {
  id: string
  title: string
  description?: string
  deadline?: Date
}

export interface Insight {
  trend: string
  score: number
  source?: string
}

export interface AIProvider {
  /**
   * Send a chat message and get a response.
   * Supports multilingual coaching with locale parameter.
   */
  chat(messages: Message[], locale?: string): Promise<AIResponse>

  /**
   * Generate actionable tasks from a context description.
   */
  generateTasks(context: string): Promise<Task[]>

  /**
   * Research trends in a specific niche across multiple locales.
   */
  researchTrends(niche: string, locales?: string[]): Promise<Insight[]>
}
