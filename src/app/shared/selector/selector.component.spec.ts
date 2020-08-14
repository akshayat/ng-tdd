import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiCallService } from '../api-call.service';
import { Item } from '../item';
import { StartsWithPipe } from '../starts-with.pipe';
import { SelectorComponent } from './selector.component';

describe('SelectorComponent', () => {
  let component: SelectorComponent;
  let fixture: ComponentFixture<SelectorComponent>;
  let nativeElement: HTMLElement;
  let apiCall: ApiCallService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectorComponent, StartsWithPipe],
      providers: [ApiCallService],
      imports: [HttpClientModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    apiCall = TestBed.inject(ApiCallService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('search bar', () => {
    it('should have a search bar', () => {
      const searchBar = nativeElement.querySelector('input.search-bar');
      expect(searchBar).toBeTruthy();
    });

    it('should filter from searchbar', () => {
      // set the items
      const itemInput: Item[] = [{ title: 'Foo' }, { title: 'Bar' }];

      component.items = itemInput;

      fixture.detectChanges();

      // type in search bar
      const searchBar: HTMLInputElement = nativeElement.querySelector(
        'input.search-bar'
      );
      searchBar.value = 'f';
      searchBar.dispatchEvent(new Event('keypress'));

      fixture.detectChanges();

      const itemList = nativeElement.querySelectorAll('li.item');
      expect(itemList.length).toBe(1);
    });
  });

  describe('Fetch button', () => {
    it('should have a fetch button', () => {
      const fetchButton = nativeElement.querySelector('button.fetch-button');
      expect(fetchButton).toBeTruthy();
    });

    it('Should fetch from API and show in list', fakeAsync(() => {
      // given

      spyOn(apiCall, 'fetchItem').and.returnValue(
        of([{ title: 'Foo' }, { title: 'Bar' }, { title: 'Another' }]).pipe(
          delay(5000)
        )
      );

      const itemInput: Item[] = [{ title: 'Foo' }, { title: 'Bar' }];

      component.items = itemInput;

      fixture.detectChanges();

      let itemList = nativeElement.querySelectorAll('li.item');
      expect(itemList.length).toBe(2);

      // when
      const fetchButton: HTMLButtonElement = nativeElement.querySelector(
        'button.fetch-button'
      );
      fetchButton.click();

      tick(5000);

      fixture.detectChanges();

      // then
      itemList = nativeElement.querySelectorAll('li.item');
      expect(itemList.length).toBe(3);
    }));
  });

  describe('Select all button', () => {
    it('Should have a select all button', () => {
      const selectAllButton = nativeElement.querySelector('button.select-all');
      expect(selectAllButton).toBeTruthy();
    });
    it('Should check all the checkboxes if I click on select all button', () => {
      const itemInput: Item[] = [{ title: 'Foo' }, { title: 'Bar' }];

      component.items = itemInput;

      fixture.detectChanges();

      const itemList = nativeElement.querySelectorAll('li.item');
      expect(itemList.length).toBe(2);

      let selectedCheckbox = nativeElement.querySelectorAll(
        'li.item input[type=checkbox]:checked'
      );
      expect(selectedCheckbox.length).toBe(0);

      const selectAllButton: HTMLButtonElement = nativeElement.querySelector(
        'button.select-all'
      );
      selectAllButton.click();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        selectedCheckbox = nativeElement.querySelectorAll(
          'li.item input[type=checkbox]:checked'
        );
        expect(selectedCheckbox.length).toBe(2);
      });
    });
  });

  describe('Items', () => {
    it('Should have items if provided', () => {
      const itemInput: Item[] = [{ title: 'Foo' }, { title: 'Bar' }];

      component.items = itemInput;

      fixture.detectChanges();

      const itemList = nativeElement.querySelectorAll('li.item');
      expect(itemList.length).toBe(2);

      const checkboxList = nativeElement.querySelectorAll(
        'li.item input[type=checkbox]'
      );
      expect(checkboxList.length).toBe(2);
    });
  });
});
