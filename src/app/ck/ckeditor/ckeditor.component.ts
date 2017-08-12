import { Component, OnInit,Input,Output ,ElementRef,EventEmitter} from '@angular/core';
// import "ckeditor";
@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css']
})
export class CkeditorComponent implements OnInit {
  @Input() targetId="d";
  @Input() object;
  // @Input() rows = 10;  //you can also give default values here
  // @Input() cols;
 @Output() getElement = new EventEmitter<string>();
  constructor() {
    }

  ngOnInit() { 
  }
 ngAfterViewInit()
    {
        var editor =window['CKEDITOR']['replace']( this.targetId,  {
        height: 350
    });  
   
  }
  getFileMimeType = function (fileFormat) {
        if(fileFormat == 'jpg' || fileFormat == 'jpeg'){
            return "image/jpg";
        }else if(fileFormat == 'png'){
            return "image/png";
        }else if(fileFormat == 'gif'){
            return "image/gif";
        }else if(fileFormat == 'mp4'){
            return "video/mp4";
        }else if(fileFormat == 'wmv'){
            return "video/x-ms-wmv";
        }else if(fileFormat=='pdf')
            return"object/pdf" ;
        else {
            return "application";
        }
    };
    InsertHTML(){
      var editor = window['CKEDITOR'].instances[this.targetId];
      console.log(editor)
      var fileFormat=this.getFileMimeType(this.object["fileFormat"])
      var value
      // var value="<img src='http://witwin-test.oss-cn-hangzhou.aliyuncs.com/test1/KjnQfPXcJF.jpg'/>"
     
      if ( editor.mode == 'wysiwyg' )
      {
        // Insert HTML code.
        // http://docs.ckeditor.com/#!/api/CKEDITOR.editor-method-insertHtml
        if(fileFormat.startsWith('image')){
          value="<img src='"+this.object["value"]+"'/>"
          editor.insertHtml( value );
        }else if(fileFormat.startsWith('video')){
            value = window['CKEDITOR'].dom.element.createFromHtml( '<div class="ckeditor-html5-video" style="text-align: center;"> <video controls="controls"  src='+this.object["value"]+'>&nbsp;</video> </div> <br/>');
            // value="<video  controls autoplay src='"+this.object["value"]+"'></video>"
            editor.insertElement( value );
          }
        
      }
    else
        alert( 'You must be in WYSIWYG mode!' );
    }
    GetContents(){
     var editor = window['CKEDITOR'].instances[this.targetId];
      this.getElement.emit(editor.getData());
      
    //   var editor = window['CKEDITOR'].instances[this.targetId];
    // console.log(editor)
    // console.log(editor.getData())
    // // Get editor content.
    // // http://docs.ckeditor.com/#!/api/CKEDITOR.editor-method-getData
    // alert( editor.getData() );
    }
}
