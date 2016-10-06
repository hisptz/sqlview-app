import { SqlViewAppPage } from './app.po';

describe('sql-view-app App', function() {
  let page: SqlViewAppPage;

  beforeEach(() => {
    page = new SqlViewAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
