/**
 * Report Provider Interface
 * 
 * Abstraction layer for generating reports (Excel, PDF, CSV).
 * Implementations: ExcelJSProvider, MockProvider
 */

export interface ReportProvider {
  /**
   * Generate an Excel file from data.
   */
  generateExcel(data: Record<string, unknown>[], fileName: string): Promise<Buffer>

  /**
   * Generate a PDF report from a template.
   */
  generatePDF(templateId: string, data: Record<string, unknown>): Promise<Buffer>

  /**
   * Generate a full export manifest for high-capacity data.
   * Returns a JSON object with URLs to download individual files.
   */
  generateFullExportManifest(userId: string): Promise<{
    files: Array<{ name: string; url: string; size: number }>
    totalSize: number
    expiresAt: Date
  }>
}
