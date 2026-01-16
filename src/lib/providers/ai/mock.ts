/**
 * Mock AI Provider
 * 
 * Development/testing implementation of AIProvider.
 * Returns canned responses instead of calling an actual LLM.
 */

import type { AIProvider, Message, AIResponse, Task, Insight } from './types'

export class MockAIProvider implements AIProvider {
  async chat(messages: Message[], locale?: string): Promise<AIResponse> {
    const lastMessage = messages[messages.length - 1]
    return {
      text: `[Mock AI Response] You said: "${lastMessage?.content || 'nothing'}" (locale: ${locale || 'en'})`,
      raw: { mock: true, messageCount: messages.length },
    }
  }

  async generateTasks(context: string): Promise<Task[]> {
    return [
      {
        id: 'task_1',
        title: `Review: ${context.substring(0, 20)}...`,
        description: 'Auto-generated task from MockAIProvider',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'task_2',
        title: 'Follow up on analysis',
        description: 'Schedule a follow-up meeting',
      },
    ]
  }

  async researchTrends(niche: string, locales?: string[]): Promise<Insight[]> {
    const localeStr = locales?.join(',') || 'global'
    return [
      { trend: `${niche} is growing`, score: 0.85, source: `mock-${localeStr}` },
      { trend: `Interest in ${niche} peaked last month`, score: 0.72, source: `mock-${localeStr}` },
    ]
  }
}

