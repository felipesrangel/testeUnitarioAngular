import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MCOK_LIST } from '../../services/list-investiments.mock';
import { Investiments } from '../../model/investiments';
import { ListInvestimentsService } from '../../services/list-investiments.service';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: ListInvestimentsService;
  const mockList: Array<Investiments> = MCOK_LIST;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    service = TestBed.inject(ListInvestimentsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`
  (U) should list investiments`, ()=>{
    spyOn(service, 'list').and.returnValue(of(mockList));

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.list).toHaveBeenCalledWith();
    expect(component.investiments.length).toEqual(5);
    expect(component.investiments[0].name).toContain("Banco 1");
    expect(component.investiments[0].value).toEqual(100);
    expect(component.investiments[4].name).toContain("Banco 5");
    expect(component.investiments[4].value).toEqual(100);

  });

  it(`(I) should list investiments`, ()=>{
    spyOn(service, 'list').and.returnValue(of(mockList));

    component.ngOnInit();
    fixture.detectChanges();

    let investiments = 
      fixture.debugElement.nativeElement.querySelectorAll('.list-itens');

      expect(investiments.length).toEqual(5);
      expect(investiments[0].textContent.trim()).toEqual("Banco 1 | 100");
      
  })
});
