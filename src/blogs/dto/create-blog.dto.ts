export class CreateBlogDto {
  readonly title: string;
  readonly userId: string;
  readonly htmlText: string;
  readonly avtar?: string;
}
