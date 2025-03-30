export class CreateBlogDto {
  readonly title: string;
  readonly userId: string;
  readonly groupId: string;
  readonly htmlText: string;
  readonly userName: string;
  readonly avtar?: string;
}
