export default function extractNumbers(str: string): string {
  return str.replace(/\D/g, "");
}
