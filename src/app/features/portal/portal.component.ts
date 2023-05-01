import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { SMMaterialModule } from '../../webapp-common/shared/material/material.module'
import {ICONS} from '@common/constants';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { style } from '@angular/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import {CartService} from '~/shared/services/cart.service'


export interface tags {
  name: string;
}

declare var LeaderLine: any;

@Component({
  selector: 'sm-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  
})
export class PortalComponent implements OnInit {  
 
  readonly ICONS = ICONS;
  isPanelOpen = false;
  dataSetId: any;
  abc: any;
  name: any;
  id: any;
  data_name: any;
  version: any;
  desc: any;
  view_url: any;
  run_url: any;
  panelOpenState: boolean;
  ab: any = [];
  selectedApps: any;
  Array: any = [];
  Modules: any = [];
  Dataset: any = [];
  Engin: any = [];
  Frontend: any = [];
  Solution: any = [];
  
  Searchvalue: string = '';
  Searchdata: string = 'datasetName';
  Searchvalue1: string = '';
  Searchdata1: string = 'modelName';
  Searchvalue2: string = '';
  Searchdata2: string = 'pipelineName';
  Searchvalue3: string = '';
  Searchdata3: string = 'frontendName';
  Searchvalue4: string = '';
  Searchdata4: string = 'solutionName';
  Searchdata5:string='solutionTags';
  ishidden: boolean = false;
  selectedIndex: number = 0;
  filled: boolean = false;
  tags:tags[]=[{name:'tag1'},{name:'tag2'}];
  drop(event: CdkDragDrop<tags[]>) {
    moveItemInArray(this.tags, event.previousIndex, event.currentIndex);
  }

  innerHeight: any;
    innerWidth: any;


  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    public snackBar: MatSnackBar,
    private toastr: ToastrService,
    private cartService:CartService) { 
    this.innerHeight = (window.screen.height) + "px";
        this.innerWidth = (window.screen.width) + "px";
        console.log(this.innerHeight);
        console.log(this.innerWidth);
  }
  
  ngOnInit(): void {
    
    // this.fetchData();
    this.getModel();
    this.getSolution();
    this.getdataset();
    this.getPipeline();
    this.getFrontend();

    
    //--------------------------------------------------------------------------------------------------------------------------------

    // window.onload = () => {
    //   const table1 = document.getElementById("table1");
    //   const table2 = document.getElementById("table2");
    //   const table3 = document.getElementById("table3");
    //   const table4 = document.getElementById("table4");
    //   const table5 = document.getElementById("table5");
    //   const element2 = document.getElementById("element2") as HTMLInputElement;
      
    //   function createArrow(from, to, yOffset) {
    //     return new LeaderLine(
    //       LeaderLine.pointAnchor(from, { x: '120%', y: `calc(50% + ${yOffset}px)` }),
    //       LeaderLine.pointAnchor(to, { x: 0, y: `calc(50% + ${yOffset}px)` }),
    //       {
    //         color: 'black',
    //         size: 2,
    //         startSocket: 'right',
    //         endSocket: 'left',
    //         startPlug: 'behind',
    //         endPlug: 'arrow2',
    //         endPlugSize: 1.5,
    //         path: 'fluid',
    //         dash: { animation: true },
    //       }
    //     );
    //   }

    //   const rows1 = table1.querySelectorAll("tr");
    //   const rows2 = table2.querySelectorAll("tr");
    //   const rows3 = table3.querySelectorAll("tr");
    //   const rows4 = table4.querySelectorAll("tr");
    //   const rows5 = table5.querySelectorAll("div");

    
    //   let arrowLink2;
    //   let arrowLink3;
    //   let arrowLink4;
    //   let arrowLink5;
    //   let arrowLink6;

    //   const updateArrows = () => {
    //     if (element2.checked && !arrowLink2) {
    //       arrowLink2 = createArrow(rows1[2].querySelector("td"), rows2[2].querySelector("td"), 5);
    //     } else if (!element2.checked && arrowLink2) {
    //       arrowLink2.remove();
    //       arrowLink2 = null;
    //     }
    //     if (element2.checked && !arrowLink4) {
    //       arrowLink4 = createArrow(rows2[0].querySelector("td"), rows3[1].querySelector("td"), 5);
    //     } else if (!element2.checked && arrowLink4) {
    //       arrowLink4.remove();
    //       arrowLink4 = null;
    //     }
    //     if (element2.checked && !arrowLink5) {
    //       arrowLink5 = createArrow(rows3[0].querySelector("td"), rows4[1].querySelector("td"), 5);
    //     } else if (!element2.checked && arrowLink6) {
    //       arrowLink5.remove();
    //       arrowLink5 = null;
    //     }
    //     if (element2.checked && !arrowLink6) {
    //       arrowLink6 = createArrow(rows4[0].querySelector("td"), rows5[0].querySelector("mat-expansion-panel"), 5);
    //       // arrowLink3 = createArrow(rows3[0].querySelector("td"), rows4[1].querySelector("td"), 5);
    //     } else if (!element2.checked && arrowLink6 && arrowLink3) {
    //       arrowLink6.remove();
    //       arrowLink3.remove();
    //       arrowLink6 = null;
    //       // arrowLink3 = null;
    //     }
    //   }

    //   element2.addEventListener("change", updateArrows);
     
    // };

    
        //--------------------------------------------------------------------------------------------------------------------------------
  }
  
  arrowLink2:any;
  arrowLink3:any;
  arrowLink4:any;
  arrowLink5:any;
  arrowLink6:any;
  arrowLink7:any;
  arrowLink8:any;
  arrowLink9:any;
  arrowLink10:any;
  arrowLink11:any;
  arrowLink12:any;
  arrowLink13:any;

  rows1:any;
  rows2:any;
  rows3:any;
  rows4:any;
  rows5:any;
  searchResponse:any;
  filterSolution() {
    let search = this.Searchvalue4;
    let table =  "Solutions"; 
    let col1=  "solutionName";
    let col2 = "solutionTags";
    this.http.post('http://3.111.229.37:3000/search', { search, table, col1, col2})
      .subscribe(response => {  
        this.searchResponse=response;
        this.Solution = this.searchResponse.data;
        console.log("search Response",this.searchResponse.data)
      }
      )
     
    
  
  }

  filterFrontend() {
    let search = this.Searchvalue3;
    let table =  "Frontends"; 
    let col1=  "frontendName";
    this.http.post('http://3.111.229.37:3000/search', { search, table, col1})
      .subscribe(response => {  
        this.searchResponse=response;
        this.Frontend = this.searchResponse.data;
        console.log("search Response",this.searchResponse.data)
      }
      )
     
    
  
  }

  filterPipeline() {
    let search = this.Searchvalue2;
    let table =  "Pipelines"; 
    let col1=  "pipelineName";
    let col2 = "pipelineTags";
    this.http.post('http://3.111.229.37:3000/search', { search, table, col1, col2})
      .subscribe(response => {  
        this.searchResponse=response;
        this.pipeline = this.searchResponse.data;
        console.log("search Response",this.searchResponse.data)
      }
      )
  }

  filterModel() {
    let search = this.Searchvalue1;
    let table =  "Models"; 
    let col1=  "modelName";
    let col2 = "modelTags";
    this.http.post('http://3.111.229.37:3000/search', { search, table, col1, col2})
      .subscribe(response => {  
        this.searchResponse=response;
        this.Modules = this.searchResponse.data;
        console.log("search ResponseModel",this.searchResponse.data)
      }
      )
  }


  filterData() {
    let search = this.Searchvalue;
    let table =  "Data"; 
    let col1=  "datasetName";
   
    this.http.post('http://3.111.229.37:3000/search', { search, table, col1})
      .subscribe(response => {  
        this.searchResponse=response;
        this.Dataset = this.searchResponse.data;
        console.log("search ResponseData",this.searchResponse.data)
      }
      )
  }

  refresh(){
    debugger
    // this.updateArrows('remove')
    // if(this.arrowLink2!=null){
    //   this.arrowLink2.remove();
    //   this.arrowLink2=null;
    // }
    
    this.getModel();
    this.getSolution();
    this.getdataset();
    this.getPipeline();
    this.getFrontend();
    this.linkCheck();
    this.isPanelOpen=false;
    
    
  }
  
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'modelName',
    selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: true
  };
  dropdownSettings1 = {
    singleSelection: false,
    idField: 'id',
    textField: 'datasetName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  dropdownSettings2 = {
    singleSelection: false,
    idField: 'id',
    textField: 'pipelineName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  dropdownSettings3 = {
    singleSelection: false,
    idField: 'id',
    textField: 'frontendName',
    selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  dropdownList = [];
 

  onItemSelect(data: any,jars:any) {
   debugger
    if(jars=='dataset'){
      this.dropdowndata.push(data.id);
      // this.dropdowndata=data;
     
    }else if(jars=='model'){
      this.dropdownmodel.push(data.id);
      // this.dropdownmodel=data;
     
    }else if(jars=='pipeline'){
      this.dropdownpipeline.push(data.id);
      // this.dropdownpipeline=data;
      
    }else if(jars=='frontend'){
      this.dropdownfrontend.push(data.id);
      // this.dropdownfrontend=data;
    }

  }
  
  unselect(data:any,jars:any){
    debugger

    let solutionId = this.formdata7.controls['solution_id'].value.toString();
    
   

    if(jars=='dataset'){
      let dataId=data.id.toString();
      // this.editdropdowndata.push((data.id).toString());
      this.http.post('http://3.111.229.37:3000/solution/deleteDynamic', { solutionId, dataId})
      .subscribe(response => {  
        this.storeResponse=response;
        alert(this.storeResponse.message);
      }
      )
     
    }else if(jars=='model'){
      let modelId=data.id.toString();
      // this.editdropdownmodel.push((data.id).toString());
      this.http.post('http://3.111.229.37:3000/solution/deleteDynamic', { solutionId, modelId})
      .subscribe(response => { 
        this.storeResponse=response;
        alert(this.storeResponse.message);
       
      }
      )
     
    }else if(jars=='pipeline'){
      let pipelineId=data.id.toString();
      // this.editdropdownpipeline.push((data.id).toString());
      this.http.post('http://3.111.229.37:3000/solution/deleteDynamic', { solutionId, pipelineId})
      .subscribe(response => {
        this.storeResponse=response;
        alert(this.storeResponse.message);
       
      }
      )
      
    }else if(jars=='frontend'){
      let frontendId=data.id.toString();
      // this.editdropdownfrontend.push((data.id).toString());
      this.http.post('http://3.111.229.37:3000/solution/deleteDynamic', { solutionId, frontendId})
      .subscribe(response => {
        this.storeResponse=response;
        alert(this.storeResponse.message);
       
      }
      )
    }
    
  }

 
  onEditItemSelect(data: any,jars:any) {
    debugger
     if(jars=='dataset'){
       this.editdropdowndata.push((data.id).toString());
       // this.dropdowndata=data;
      
     }else if(jars=='model'){
       this.editdropdownmodel.push((data.id).toString());
       // this.dropdownmodel=data;
      
     }else if(jars=='pipeline'){
       this.editdropdownpipeline.push((data.id).toString());
       // this.dropdownpipeline=data;
       
     }else if(jars=='frontend'){
       this.editdropdownfrontend.push((data.id).toString());
       // this.dropdownfrontend=data;
     }
 
   }
 
 
// -----------------------------------------------

  formdata = this.formBuilder.group({
    type: [],
    name: [,Validators.required],
    id: [,Validators.required],
    version: [,Validators.required],
    desc: [,Validators.required],
    url: [,Validators.required]
  })
  formdata1 = this.formBuilder.group({
    dataset_name: ['', Validators.required],
    dataset_project: ['', Validators.required],
    dataset_id: [],
    version: [],
    description: []
  })
  formdata2 = this.formBuilder.group({
    project_name: ['', Validators.required],
    view_url: ['', Validators.required],
    run_url: ['', Validators.required],
    model_tags:['', Validators.required],
    desc:['', Validators.required],
  })
  formdata3 = this.formBuilder.group({
    solution_name: ['', Validators.required],
    view_url: ['', Validators.required],
    solution_tags: ['', Validators.required],
    solution_description: ['', Validators.required],
    run_url:['', Validators.required]
  })
  formdata4 = this.formBuilder.group({
    name: [],
    version: [],
    desc: [],
    id: [],
    url:[],
    main_id:[],
   
  })
 
  formdata6 = this.formBuilder.group({
    project_name: [],
    id: [],
    desc:[],
    view_url:[],
    run_url:[],
    modelTags:[]
  })
  formdata7 = this.formBuilder.group({
    solution_name: [],
    solution_description: [],
    solution_tags: [],
    solution_id:[],
    solution_version:[],
    run_url:[],
    view_url:[],
    linkedarray:[],
    linkeddata:[],
    linkedpipeline:[],
    linkedfrontend:[]
  })
  formdata8 = this.formBuilder.group({
    pipeline_name:['', Validators.required],
    pipelineView_url:['', Validators.required],
    pipeline_description:['', Validators.required],
    pipeline_tags:['', Validators.required],
    id:[]
  })
  formdata9=this.formBuilder.group({
    frontend_name:['', Validators.required],
    frontendStyle_url:['', Validators.required],
    frontendRun_url:['', Validators.required],
    frontend_description:['', Validators.required],
    id:[]
  })
  storeResponse: any;
  pipeline:any=[];
  // ------------------------------Model  jar section-------------------------------
  addModel() {
    
    let modelName = this.formdata2.controls['project_name'].value;
    let modelViewUrl = this.formdata2.controls['view_url'].value;
    let modelRunUrl = this.formdata2.controls['run_url'].value;
    let modelTags = this.formdata2.controls['model_tags'].value;
    let modelDescription = this.formdata2.controls['desc'].value;
    this.http.post('http://3.111.229.37:3000/model/insertModel', { modelName, modelViewUrl, modelRunUrl, modelTags, modelDescription })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        this.toastr.success(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getModel();
      }
      )
  }
  editModel() {
    
    let modelName = this.formdata6.controls['project_name'].value;
    let modelId = this.formdata6.controls['id'].value.toString();
    let modelTags = this.formdata6.controls['modelTags'].value;
    let modelDescription = this.formdata6.controls['desc'].value;
    let modelRunUrl = this.formdata6.controls['run_url'].value;
    let modelViewUrl = this.formdata6.controls['view_url'].value;
    this.http.post('http://3.111.229.37:3000/model/editModel', { modelName, modelTags, modelId, modelDescription, modelRunUrl, modelViewUrl })
      .subscribe(response => {
        console.log("res", response);
        this.storeResponse = response;
        this.toastr.warning(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getModel();
      }
      )
  }
  modelId:any;
  deleteModel() {
    
    let modelId=this.modelId;

    this.http.post('http://3.111.229.37:3000/model/deleteModel', { modelId })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        this.toastr.error(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getModel();
      }
      )
  }
  dumbb: any;
  dumbb1: any;
  dumbb2: any;

  getModel() {
    this.http.post('http://3.111.229.37:3000/model/retrieveModels', {})
      .subscribe(response => {
        this.dumbb = response;
        this.Modules = this.dumbb.data;
        console.log(this.Modules);
      }
      )
  }
// ------------------------------dataset section-------------------------------
  addDataset() {
   debugger
    let datasetName = this.formdata.controls['name'].value;
    let datasetId = this.formdata.controls['id'].value;
    let datasetVersion = this.formdata.controls['version'].value;
    let datasetDescription = this.formdata.controls['desc'].value;
    let datasetUrl = this.formdata.controls['url'].value;
    this.http.post('http://3.111.229.37:3000/data/insertData', {datasetUrl, datasetName, datasetId, datasetVersion, datasetDescription })
      .subscribe(response => {
        console.log(response)
        this.storeResponse = response;
        this.toastr.success(this.storeResponse.message);
        // alert(this.storeResponse.message);
        this.getdataset();
      }
      );
  }
  editDataset() {
    debugger
    let datasetName = this.formdata4.controls['name'].value;
    let datasetVersion = this.formdata4.controls['version'].value;
    let datasetDescription = this.formdata4.controls['desc'].value;
    let datasetUrl = this.formdata4.controls['url'].value;
    let datasetId =this.formdata4.controls['id'].value.toString(); //unique dataset Id 
    let id = this.formdata4.controls['main_id'].value.toString(); // unique primery key generated by DB
    
   

    console.log("datasetId", datasetName, datasetId, datasetVersion, datasetDescription)
    this.http.post('http://3.111.229.37:3000/data/editDataset', { datasetName, datasetId, datasetVersion, datasetDescription, datasetUrl })
      .subscribe(response => {
        console.log(response)
        this.storeResponse = response;
        this.toastr.warning(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getdataset();
      }
      );
  }
  datasetId:any;
  deleteDataset() {

    let datasetId=this.datasetId;

    this.http.post('http://3.111.229.37:3000/data/deleteDataset', { datasetId })
      .subscribe(response => {
        debugger
        console.log(response)
        this.storeResponse = response;
        this.toastr.error(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getdataset();
      }
      );
  }
  getdataset() {
    this.http.post('http://3.111.229.37:3000/data/retrieveDatasets', {})
      .subscribe(response => {
        this.dumbb1 = response;
        this.Dataset = this.dumbb1.data;
        console.log("abc", this.Dataset);
      }
      )
  }
// --------------------------------Pipeline Section---------------------------------
  addPipeline(){
  
    let pipelineName=this.formdata8.controls['pipeline_name'].value;
    let pipelineViewUrl=this.formdata8.controls['pipelineView_url'].value;
    let pipelineTags=this.formdata8.controls['pipeline_tags'].value;
    let pipelineDescription=this.formdata8.controls['pipeline_description'].value;
    
    this.http.post('http://3.111.229.37:3000/pipeline/insertPipeline', {pipelineName,pipelineViewUrl,pipelineTags,pipelineDescription })
      .subscribe(response => {
        console.log(response)
        this.storeResponse = response;
        this.toastr.success(this.storeResponse.message);
        // alert(this.storeResponse.message);
        this.getPipeline();
      }
      );
  }
  getPipeline(){
    this.http.post('http://3.111.229.37:3000/pipeline/retrievePipelines', {})
      .subscribe(response => {
        this.dumbb1 = response;
        this.pipeline = this.dumbb1.data;
        console.log("pipeline", this.pipeline);
        
      }
      )
  }

  editPipeline() {

    let pipelineId=this.formdata8.controls['id'].value;
    let pipelineName=this.formdata8.controls['pipeline_name'].value;
    let pipelineViewUrl=this.formdata8.controls['pipelineView_url'].value;
    let pipelineTags=this.formdata8.controls['pipeline_tags'].value;
    let pipelineDescription=this.formdata8.controls['pipeline_description'].value;
    
    this.http.post('http://3.111.229.37:3000/pipeline/editPipeline', { pipelineId,pipelineName,pipelineViewUrl,pipelineTags,pipelineDescription})
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        this.toastr.warning(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getPipeline();
      });
  }

  pipelineId:any;
  frontendId:any;

  deletePipeline(){
   
    let pipelineId=this.pipelineId
    this.http.post('http://3.111.229.37:3000/pipeline/deletePipeline', { pipelineId })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        this.toastr.error(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getPipeline();
      }
      )
  }
// ------------------------------Frontend Jar-------------------------------
  addFrontend(){
   debugger
    let frontendName=this.formdata9.controls['frontend_name'].value;
    let frontendStylesUrl=this.formdata9.controls['frontendStyle_url'].value;
    let frontendRunUrl=this.formdata9.controls['frontendRun_url'].value;
    let frontendDescription=this.formdata9.controls['frontend_description'].value;

    this.http.post('http://3.111.229.37:3000/frontend/insertFrontend', {frontendName,
    frontendStylesUrl,
    frontendRunUrl,
    frontendDescription })
      .subscribe(response => {
        console.log(response)
        this.storeResponse = response;
        this.toastr.success(this.storeResponse.message);
        // alert();
        this.getFrontend();
      }
      );
  }

  getFrontend(){
    this.http.post('http://3.111.229.37:3000/frontend/retrieveFrontends', {})
      .subscribe(response => {
        this.dumbb1 = response;
        this.Frontend = this.dumbb1.data;
        console.log("Frontend", this.Frontend);
      }
      )
  }
  editFrontend(){

    let frontendName=this.formdata9.controls['frontend_name'].value;
    let frontendStylesUrl=this.formdata9.controls['frontendStyle_url'].value;
    let frontendRunUrl=this.formdata9.controls['frontendRun_url'].value;
    let frontendDescription=this.formdata9.controls['frontend_description'].value;
    let id=this.formdata9.controls['id'].value;
    
    this.http.post('http://3.111.229.37:3000/frontend/editFrontend', {id,frontendName,
    frontendStylesUrl,
    frontendRunUrl,
    frontendDescription})
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        this.toastr.warning(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getFrontend();
      });

  }
deleteFrontend(){
  
  let id=this.frontendId;
    this.http.post('http://3.111.229.37:3000/frontend/deleteFrontend', { id })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        this.toastr.error(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getFrontend();
      }
      )
}
  //------------------------------unknow-------------------------------
  getData(data: any) {
    console.log("clicked", data)
    this.abc = data
    console.log("abcName", this.abc.id)
    this.formdata4.controls['main_id'].setValue(data.id);
    this.formdata4.controls['name'].setValue(data.datasetName);
    this.formdata4.controls['version'].setValue(data.datasetVersion);
    this.formdata4.controls['desc'].setValue(data.datasetDescription);
    this.formdata4.controls['url'].setValue(data.datasetUrl);
    this.formdata4.controls['id'].setValue(data.datasetId)
    this.formdata4.controls['id'].disable();
  }
  getDataModel(data: any) {
    console.log("clicked", data)
    this.formdata6.controls['project_name'].setValue(data.modelName);
    this.formdata6.controls['id'].setValue(data.modelId)
    this.formdata6.controls['desc'].setValue(data.modelDescription);
    this.formdata6.controls['run_url'].setValue(data.modelRunUrl);
    this.formdata6.controls['view_url'].setValue(data.modelViewUrl);
    this.formdata6.controls['modelTags'].setValue(data.modelTags);
  }
  
  selectedValues:any;
  selectedValues1:any;
  selectedValues2:any;
  selectedValues3:any;
  // selectedIds:any;
   dropdownSettingsmodel:any
   dropdownSettingsdata:any
   dropdownSettingspipeline:any
   dropdownSettingsfrontend:any

  getDataSolution(data:any){
  
    console.log("clickedsolution", data)
    this.formdata7.controls['solution_name'].setValue(data.solutionName)
    // this.formdata7.controls['solution_version'].setValue(data.solutionVersion)
    this.formdata7.controls['solution_id'].setValue(data.id)
    this.formdata7.controls['solution_tags'].setValue(data.solutionTags)
    this.formdata7.controls['solution_description'].setValue(data.solutionDescription)
    this.formdata7.controls['view_url'].setValue(data.solutionViewUrl)
    this.formdata7.controls['run_url'].setValue(data.solutionRunUrl)
    this.formdata7.controls['linkedarray'].setValue(data.models)
    this.formdata7.controls['linkeddata'].setValue(data.datasets)
    this.formdata7.controls['linkedpipeline'].setValue(data.pipelines)
    this.formdata7.controls['linkedfrontend'].setValue(data.frontends)
   debugger
    this.selectedValues=data.models;
    this.selectedValues1=data.datasets;
    this.selectedValues2=data.pipelines;
    this.selectedValues3=data.frontends;
    
    this.dropdownSettingsmodel = {
      singleSelection: false,
      selectedValues:this.selectedValues,
      idField: 'id',
      textField: 'modelName',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

    this.dropdownSettingsdata = {
      singleSelection: false,
      selectedValues:this.selectedValues1,
      idField: 'id',
      textField: 'datasetName',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

    this.dropdownSettingspipeline = {
      singleSelection: false,
      selectedValues:this.selectedValues2,
      idField: 'id',
      textField: 'pipelineName',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

    this.dropdownSettingsfrontend = {
      singleSelection: false,
      selectedValues:this.selectedValues3,
      idField: 'id',
      textField: 'frontendName',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

  }
  getDataPipeline(data:any){
    this.formdata8.controls['pipeline_name'].setValue(data.pipelineName)
    this.formdata8.controls['pipelineView_url'].setValue(data.pipelineViewUrl)
    this.formdata8.controls['pipeline_tags'].setValue(data.pipelineTags)
    this.formdata8.controls['pipeline_description'].setValue(data.pipelineDescription) 
    this.formdata8.controls['id'].setValue(data.pipelineId) 
  }
  getDataFrontend(data:any){
    this.formdata9.controls['frontend_name'].setValue(data.frontendName)
    this.formdata9.controls['frontendStyle_url'].setValue(data.frontendStylesUrl)
    this.formdata9.controls['frontendRun_url'].setValue(data.frontendRunUrl)
    this.formdata9.controls['frontend_description'].setValue(data.frontendDescription)
    this.formdata9.controls['id'].setValue(data.id);
  }
// ------------------------------solution jar section-------------------------------
  addSolution() {
    let solutionName = this.formdata3.controls['solution_name'].value;
    let solutionViewUrl = this.formdata3.controls['view_url'].value;
    let solutionRunUrl= this.formdata3.controls['run_url'].value;
    let solutionTags = this.formdata3.controls['solution_tags'].value;
    let solutionDescription = this.formdata3.controls['solution_description'].value;
    let modelId=this.dropdownmodel;
    let datasetId=this.dropdowndata;
    let pipelineId=this.dropdownpipeline;
    let frontendId=this.dropdownfrontend;
    debugger
    this.http.post('http://3.111.229.37:3000/solution/insertSolution', { solutionName, solutionViewUrl, solutionTags, solutionDescription, solutionRunUrl,modelId,datasetId,pipelineId,frontendId })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        this.toastr.success(this.storeResponse.message);
        this.getSolution();
      });
  }
 
  editSolution() {
    
    let solutionName = this.formdata7.controls['solution_name'].value;
    let solutionId = this.formdata7.controls['solution_id'].value.toString();
    let solutionRunUrl=this.formdata7.controls['run_url'].value;
    let solutionViewUrl=this.formdata7.controls['view_url'].value;
    let solutionTags = this.formdata7.controls['solution_tags'].value;
    let solutionDescription = this.formdata7.controls['solution_description'].value;
    let solutionVersion = this.formdata7.controls['solution_version'].value;
    let modelId=this.editdropdownmodel;
    let dataId=this.editdropdowndata;
    let pipelineId=this.editdropdownpipeline;
    let frontendId=this.editdropdownfrontend;
    
    // solutionTags,
    this.http.post('http://3.111.229.37:3000/solution/editSolution', {solutionId, solutionName, solutionVersion, solutionDescription, solutionRunUrl,solutionViewUrl,solutionTags,frontendId,pipelineId,modelId ,dataId})
      .subscribe(response => {
        debugger
        console.log(response);
        this.storeResponse = response;
        // alert(this.storeResponse.message)
        this.toastr.warning(this.storeResponse.message);
        this.getSolution();
      });
      
        this.getSolution();
    
      
  }

  solutionId:any;
  deleteSolution(){
debugger
   
    let solutionId=this.solutionId;

    this.http.post('http://3.111.229.37:3000/solution/deleteSolution', { solutionId })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        // alert(this.storeResponse.message)
        this.toastr.error(this.storeResponse.message);
        this.getSolution();
      }
      )
  }

  linkedassets:any=[];
  linkedassets1:any=[];

  getSolution() {
    this.http.post('http://3.111.229.37:3000/solution/retrieveSolutions', {})
      .subscribe(response => {
        this.dumbb1 = response;
        debugger
        this.Solution = this.dumbb1.solutionData;
       console.log("Solution",this.Solution);
     
       for(let i=0; i<this.Solution.length; i++)
       {
       if(this.Solution[i].datasets.length!=0){
        this.linkedassets.push("Datasets")
       }
       if(this.Solution[i].pipelines.length!=0){
        this.linkedassets.push("Pipelines")
       }
       if(this.Solution[i].models.length!=0){
        this.linkedassets.push("Models")
       }
       if(this.Solution[i].frontends.length!=0){
        this.linkedassets.push("Frontends")
       }
       this.linkedassets1.push(this.linkedassets);
      
      this.Solution[i].linkedassets = this.linkedassets;
      this.linkedassets = [];
      }

        console.log(this.linkedassets1);
       
      }
      )
  }
 
  editData(data: any, jar: any) {
    this.SelectJar(jar);
    this.getDataPipeline(data)  
    // this.formdata.controls['name'].setValue(data.datasetName);
    // this.formdata.controls['version'].setValue(data.datasetVersion);
    // this.formdata.controls['id'].disable();
    // this.formdata4.controls['id'].disable();
    // this.formdata.controls['desc'].setValue(data.datasetDescription);
  }
  reload() {
    window.location.reload();
  }

  isReadMore = true;
  isReadMore1 = true;
  isReadMore2 = true;
  isReadMore3 = true;
  showText() {
     this.isReadMore = !this.isReadMore;
    
  }
  showText1(){
    this.isReadMore1 = !this.isReadMore1 
  }
  showText2(){
    this.isReadMore2 = !this.isReadMore2
  }
  showText3(){
    this.isReadMore3 = !this.isReadMore3
  }

  // Jars: any = [{ id: 1, name: 'Model' }, { id: 2, name: 'Dataset' }, { id: 3, name: 'Pipeline' }]
  // Model: any = [{ id: 1, name: 'Local Copy' }, { id: 2, name: 'Remote Copy' }, { id: 3, name: 'Using Id' }]
  data: any = [];
  store: any = [];
  
  
  
  copytext() {
    navigator.clipboard.writeText(this.value1);
  }
  copytext1() {
    navigator.clipboard.writeText(this.value2);
  }
  ds: boolean = false;
  mdl: boolean = false;
  sln: boolean = false;
  ppln:boolean=false;
  fend:boolean=false;
  jar: any;
  SelectJar(jar: any) {
  
    if (jar == 'Dataset') {
      this.ds = true;
      this.mdl = false;
      this.sln = false;
      this.ppln=false;
      this.fend=false;
    } else if (jar == 'Model') {
      this.ds = false;
      this.mdl = true;
      this.sln = false;
      this.ppln=false;
      this.fend=false;
    } else if (jar == 'Solution') {
      this.ds = false;
      this.mdl = false;
      this.sln = true;
      this.ppln=false;
      this.fend=false;
    } else if(jar == 'Pipeline'){
      this.ds = false;
      this.mdl = false;
      this.sln = false;
      this.ppln= true;
      this.fend=false;
    }else if(jar == 'Frontend'){
      this.ds = false;
      this.mdl = false;
      this.sln = false;
      this.ppln= false;
      this.fend= true;
    }
  }

  deleteId(data:any,jar:any){

    this.SelectJar(jar);

    if(jar == 'Dataset'){
      this.datasetId=data.datasetId;

    }else if(jar == 'Model'){
      this.modelId=data.modelId;

    } else if(jar == 'Solution'){
      this.solutionId=data.id;

    } else if(jar == 'Pipeline'){
      this.pipelineId=data.pipelineId;

    }else if(jar == 'Frontend'){
      this.frontendId=data.id;
    }
  }
  
  value1: any = 'Enter all API_Data to generate the Script';
  new_dataset_name: any = '';
  dataset_id: any = '';
  new_dataset_project_name: any = '';
  DownloadData() {
    if (this.selectedIndex != 3) {
      this.selectedIndex = this.selectedIndex + 1;
    }
    console.log(this.selectedIndex);
    this.new_dataset_name = this.formdata1.controls['dataset_name'].value;
    this.dataset_id = this.formdata1.controls['dataset_id'].value;
    this.new_dataset_project_name = this.formdata1.controls['dataset_project'].value;
    this.value1 = `
from clearml import Dataset
#Get the dataset using Dataset Id
dataset = Dataset.get("${this.dataset_id}")
#Get the physical location of the dataset
url = dataset._task.artifacts['data'].url
# Create a dataset with ClearML\`s Dataset class
new_dataset = Dataset.create(dataset_name="${this.new_dataset_name}",
                  dataset_project="${this.new_dataset_project_name}") 
#Add the example url                 
new_dataset.add_external_files(source_url=url)
# Upload dataset to ClearML server (customizable)
new_dataset.upload() 
# commit dataset changes
new_dataset.finalize()
  `
  }
  setDataValues(data: any) {
    this.formdata1.controls['dataset_name'].setValue(data.Name);
    this.formdata1.controls['dataset_id'].setValue(data.Id);
  }
  value2: any;
  Model_Proj: any;
  model_Id: any;
  modelcode(data: any) {
    this.Model_Proj = data.Name;
    this.model_Id = data.Id;
    this.value2 =
      `from clearml import Model, Task, Logger
import tensorflow as tf
from tempfile import gettempdir
import os
import numpy as np
import warnings
warnings.filterwarnings('ignore')
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
project_config = {
    'PROJECT_NAME' : '${this.Model_Proj}'}
task = Task.init(
    project_name=project_config['PROJECT_NAME'],
    task_name='Model Inference',
    task_type='inference',
    reuse_last_task_id=False
)
logger = task.get_logger()
# print(f'Loading model: af7391e2c0784dbf9e83ba3969aee923')
model = Model('${this.model_Id}')
print(f'\nGetting a local copy of the model : {model.id}\n') 
model_path  = model.get_local_copy()
print(f'model_path= {model_path}')
#Load the model into keras/tf
model = tf.keras.models.load_model(model_path)
print(model.summary())
#Load data to run inference on mnnist test data
(x_train,y_train),(x_test,y_test) = tf.keras.datasets.mnist.load_data()
print(x_train.shape,y_train.shape,x_test.shape,y_test.shape)
#run inference
sample = x_test#[:5,:,:]
for i,img in enumerate(sample):
    pred = model.predict(np.expand_dims(img, axis=0))
    pred = np.argmax(pred, axis=1)
    logger.report_image("image", str(pred), iteration=i, image=img)`
  }
  
  @Output() CartEvent=new EventEmitter();
  badgeCount:any;

cart:any=[];
  addtoCart(data:any){
    debugger
    this.cart.push(data);
    this.badgeCount=this.cart.length;
  }


dropdowndata:any=[];
dropdownmodel:any=[];
dropdownpipeline:any=[];
dropdownfrontend:any=[];
editdropdowndata:any=[];
editdropdownmodel:any=[];
editdropdownpipeline:any=[];
editdropdownfrontend:any=[];


  empty(){
    this.pipeline=[];
    this.Dataset=[];
    this.Solution=[];
    this.Modules=[];
    this.Frontend=[];
  }
  linkagedata:any=[];
  dummy6:any=[];
  dummy5:any;
  link:boolean=false;
  linkCheck(){
    this.link= !this.link;
  }

   linkage(data:any){
    let solutionId=data.id;
    this.http.post('http://3.111.229.37:3000/solution/linked', {solutionId})
    .subscribe(response => {
      debugger
      this.linkagedata=response;
      this.empty();  
      console.log(this.linkagedata);
      this.linkCheck();
          this.Solution=this.linkagedata.solutions;
          this.isPanelOpen=true;
          this.Modules=this.linkagedata.models;
          this.pipeline=this.linkagedata.pipelines;
          this.Dataset=this.linkagedata.datasets;
          this.Frontend=this.linkagedata.frontends;

  //  if(this.Solution.length==1){
  //   this.updateArrows(data);
  // }
      }
    )
  }

  createArrow(from, to, yOffset,position) {
    debugger
    return new LeaderLine(
      LeaderLine.pointAnchor(from, { x: '159%', y: '420%' }),
      LeaderLine.pointAnchor(to, { x: '69%', y: position+'%' }),
      {
        color: 'black',
        size: 2,
        startSocket: 'right',
        endSocket: 'left',
        startPlug: 'disc',     
        endPlug: 'disc',
        endPlugSize: 1.5,
        path: 'fluid',
        gradient: true,
        lineOffset:100,
        dash: { animation: true }, 
      }
    );
  }
 
  createArrow1(from, to, yOffset,position) {
    debugger
   
    return new LeaderLine(
      LeaderLine.pointAnchor(from, { x: '333%', y: position+'%' }),
      LeaderLine.pointAnchor(to, { x: yOffset+'%', y: position+'%' }),  
      {
        color: 'black',
        size: 2,
        startSocket: 'right',
        endSocket: 'left',
        startPlug: 'disc',
        endPlug: 'disc',
        endPlugSize: 1.5,
        path: 'grid',
        dash: { animation: true },
        end:137
        
      }
    );
    
  }
  createArrow2(from, to, yOffset,position) {
    debugger
    return new LeaderLine(
      LeaderLine.pointAnchor(from, { x: '507%', y: '275%' }),
      LeaderLine.pointAnchor(to, { x: position+'%', y: '275%' }),  //427 //606
      {
        color: 'black',
        size: 2,
        startSocket: this.createArrow3,
        endSocket: 'left',
        startPlug: 'disc',
        endPlug: 'disc',
        endPlugSize: 1.5,
        path: 'fluid',
        dash: { animation: true },
       
      }
    );
  }

  createArrow3(from, to, yOffset) {
    debugger
    return new LeaderLine(
      LeaderLine.pointAnchor(from, { x: '680%', y: '275%' }),
      LeaderLine.pointAnchor(to, { x: '590%', y: '275%' }),
      {
        color: 'black',
        size: 2,
        startSocket: 'right',
        endSocket: 'left',
        startPlug: 'disc',
        endPlug: 'disc',
        endPlugSize: 1.5,
        path: 'grid',
        dash: { animation: true },
      }
    );
  }
  
//    updateArrows(data:any){
   
//     const table1 = document.getElementById("table1");
//     const table2 = document.getElementById("table2");
//     const table3 = document.getElementById("table3");
//     const table4 = document.getElementById("table4");
//     const table5 = document.getElementById("table5");
//     const element2 = document.getElementById("element2") as HTMLInputElement;

//       this.rows1 = table1.querySelectorAll("tr");
//       this.rows2 = table2.querySelectorAll("tr");
//       this.rows3 = table3.querySelectorAll("tr");
//       this.rows4 = table4.querySelectorAll("tr");
//       this.rows5 = table5.querySelectorAll("tr");

    
//       // this.arrowLink2;
//       // this.arrowLink3;
//       // this.arrowLink4;
//       // this.arrowLink5;
//       // this.arrowLink6;
    
//     //---------------solution to frontend---------------  
//     if (this.Solution && this.arrowLink2 == undefined && data !='remove') { 
//       for(let i=0;i<this.Frontend.length;i++){
//         if(this.Frontend.length<=2){
//           if(i==0){
//             this.arrowLink2 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),250,275); 
//           } else{
//             this.arrowLink3 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),250,275); 
//           }
              
//         }else{
//           if(i==0){
//             this.arrowLink2 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),250,320); 
//           } else if(i==1){
//             this.arrowLink3 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),250,320); 
//           }else{
//             this.arrowLink4 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),250,320); 
//           }
           
//         }        
//       }
//     } 
//     else if (this.arrowLink2 !=undefined && this.arrowLink3 && this.arrowLink4 && data=='remove') {
      
//           this.arrowLink2.remove();
//            this.arrowLink2 = null;
       
//           this.arrowLink3.remove();
//           this.arrowLink3 = null;
        
//           this.arrowLink4.remove();
//           this.arrowLink4 = null;
       
//     }else if(this.arrowLink2 !=undefined && this.arrowLink3  && data=='remove'){
//       this.arrowLink2.remove();
//            this.arrowLink2 = null;
       
//           this.arrowLink3.remove();
//           this.arrowLink3 = null;
//     }else if(this.arrowLink2 !=undefined  && data=='remove'){
//       this.arrowLink2.remove();
//            this.arrowLink2 = null;
   
//     }
    
//     // ---------------frontend to next---------------
//     if (this.Frontend && this.pipeline.length!=0 && !this.arrowLink5) {
//       for(let i=0;i<this.pipeline.length;i++){
//         if(this.pipeline.length<=2){
//           if(i==0){
//             this.arrowLink5 = this.createArrow1(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),242,275);
//           }else{
//             this.arrowLink6 = this.createArrow1(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),242,275);
//           } 
//         }else{
//           if(i==0){
//             this.arrowLink5 = this.createArrow1(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),249,320);
//           }else if(i==1){
//             this.arrowLink6 = this.createArrow1(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),249,320);
//           } else{
//             this.arrowLink7 = this.createArrow1(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),249,320);
//           } 
//         }       
//       }   
//     } else if(this.Frontend && this.Modules.length!=0 && !this.arrowLink5){

//     }
//     else if(this.Frontend.length!=0 && this.Dataset.length!=0 && !this.arrowLink5){
//       for(let i=0;i<this.Dataset.length;i++){
//         if(this.Dataset.length<=2){
//           if(i==0){
//             this.arrowLink5 = this.createArrow1(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),590,275);
//           }else{
//             this.arrowLink6 = this.createArrow1(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),590,275);
//           }  
//         }else{
//           if(i==0){
//             this.arrowLink5 = this.createArrow1(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),590,320);
//           }else if(i==1){
//             this.arrowLink6 = this.createArrow1(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),590,320);
//           } else{
//             this.arrowLink7 = this.createArrow1(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),590,320);
//           }  
//         }       
//       }    
//     }
//     else if (this.arrowLink5 && this.arrowLink6 && this.arrowLink7 && data== 'remove') {
//       this.arrowLink5.remove();
//           this.arrowLink5 = null;
//       this.arrowLink6.remove();
//           this.arrowLink6 = null;
//       this.arrowLink7.remove();
//           this.arrowLink7 = null;
//     }else if(this.arrowLink5 && this.arrowLink6 && data== 'remove'){
//       this.arrowLink5.remove();
//       this.arrowLink5 = null;
//       this.arrowLink6.remove();
//       this.arrowLink6 = null;
//     }else if(this.arrowLink5 && data== 'remove'){
//       this.arrowLink5.remove();
//       this.arrowLink5 = null;
//     }

// // ---------------pipeline to next---------------
//     if (this.pipeline.length!=0 && this.Modules!=0 && !this.arrowLink8) {
//       for(let i=0;i<this.Modules.length;i++){
//         if(this.Modules.length<=2){
//           if(i==0){
//             this.arrowLink8 = this.createArrow2(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),200,415);
//           }else{
//             this.arrowLink9 = this.createArrow2(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),200,415);
//           }  
//         }else{
//           if(i==0){
//             this.arrowLink8 = this.createArrow2(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),200,415);
//           }else if(i==1){
//             this.arrowLink9 = this.createArrow2(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),200,411);
//           } else{
//             this.arrowLink10 = this.createArrow2(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),200,411);
//           } 
          
//         }       
//       }  
//     } else if(this.pipeline.length!=0 && this.Dataset!=0 && !this.arrowLink8){
//       for(let i=0;i<this.Dataset.length;i++){
//         if(this.Dataset.length<=2){
//           if(i==0){
//             this.arrowLink8 = this.createArrow2(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),200,606);
//           }else{
//             this.arrowLink9 = this.createArrow2(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),200,606);
//           }    
//         }else{
//           if(i==0){
//             this.arrowLink8 = this.createArrow2(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),200,606);
//           }else if(i==1){
//             this.arrowLink9 = this.createArrow2(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),200,606);
//           } else{
//             this.arrowLink10 = this.createArrow2(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),200,606);
//           }   
//         }       
//       }  
//     }
//     else if ( this.arrowLink8 && this.arrowLink9 && this.arrowLink10 && data== 'remove') {
      
//           this.arrowLink8.remove();
//       this.arrowLink8 = null;
        
//           this.arrowLink9.remove();
//       this.arrowLink9 = null;
        
//           this.arrowLink10.remove();
//       this.arrowLink10 = null;
        
     
//     }else if(this.arrowLink8 && this.arrowLink9 &&  data== 'remove'){
//       this.arrowLink8.remove();
//       this.arrowLink8 = null;
        
//           this.arrowLink9.remove();
//       this.arrowLink9 = null;
//     }else if(this.arrowLink8 &&  data== 'remove'){
//       this.arrowLink8.remove();
//       this.arrowLink8 = null;
//     }

//     // ---------------Modules to Dataset---------------
//     debugger
//     if (this.Modules.length!=0 && this.Dataset.length!=0 && !this.arrowLink11) {
//       for(let i=0;i<this.Dataset.length;i++){
//         if(this.Dataset.length<=2){
//           if(i==0){
//             this.arrowLink11 = this.createArrow3(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),250);
//           }else{
//             this.arrowLink12 = this.createArrow3(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),250);
//           }  
//         }else{
//           if(i==0){
//             this.arrowLink11 = this.createArrow3(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),250);
//           }else if(i==1){
//             this.arrowLink12 = this.createArrow3(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),250);
//           }else{
//             this.arrowLink13 = this.createArrow3(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),250);
//           }
          
//         }       
//       }  
//     } 
//     else if (this.arrowLink11 && this.arrowLink12 && this.arrowLink13 && data=='remove') {
     
//           this.arrowLink11.remove();
//       this.arrowLink11 = null;
       
//           this.arrowLink12.remove();
//           this.arrowLink12 = null;
       
//           this.arrowLink13.remove();
//       this.arrowLink13 = null;
       
      
//     }else if(this.arrowLink11 && this.arrowLink12  && data=='remove'){
//       this.arrowLink11.remove();
//       this.arrowLink11 = null;
       
//           this.arrowLink12.remove();
//           this.arrowLink12 = null;
//     }else if(this.arrowLink11  && data=='remove'){
//       this.arrowLink11.remove();
//       this.arrowLink11 = null;
//     }
//   }
}