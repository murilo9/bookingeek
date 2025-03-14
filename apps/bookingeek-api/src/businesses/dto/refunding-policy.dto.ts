export class RefundingPolicyDto {
  doesRefund: boolean;
  refundType: 'partial' | 'total';
  description: string;
}
