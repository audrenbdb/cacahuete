import { Component, OnInit } from '@angular/core';

import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  members: Member[] = [];
  donors: string[] = [];
  recievers: string[] = [];
  nameInput: string;
  rolls: any = [];
  step: number = 1;
  randomName: string;

  addMemberForm: FormGroup;


  screenshotRdy = false;

  constructor(
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addMemberForm = this._formBuilder.group({
      name: ['']
    })

    this.randomName = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "");
  }

  addMember(data, formDirective: FormGroupDirective) {
    if (!data.value.name) return;
    if (data.value.name.length < 2) return;
    this.members.push({
      id: this.members.length,
      name: data.value.name,
      exclusions: [this.members.length],
    })
    this.getRolls();
    formDirective.reset();
    this.scroll();
  }

  scroll() {
    setTimeout(() => {
      document.querySelector('.anchor').scrollIntoView({ block: 'center' });
    }, 60);
  }

  screenResult() {
    setTimeout(() => {
      let el: any = document.querySelector(".main-wrapper");
      html2canvas(el, {scrollX: 0, scrollY: 0}).then((canvas) => {
        let img = canvas.toDataURL("image/png");
        let screenshotButton = <any>document.querySelector(".screenshot-button");
        img = img.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
        img = img.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=cacahuete.png');
        
        screenshotButton.href = img;
        this.screenshotRdy = true;
      })
    },50);
  }

  resetFocus() {
    if ("activeElement" in document) {
      let activeElement = <HTMLElement>document.activeElement;
      activeElement.blur();
    }
  }

  goNext() {
    if (!this.rolls.length) return;
    this.resetFocus();
    setTimeout(() => {
      this.step = 2;
    }, 350);
        
    setTimeout(() => {
      this.rolls.map((pair, i) => {
        this.donors[i] = pair[0].name;
        this.recievers[i] = pair[1].name;
      })

      setTimeout(() => {
        this.screenResult();
      }, 1150)
    }, 600)
  }

  goBack() {
    this.getRolls();
    let screenshotButton = <any>document.querySelector(".screenshot-button");
    screenshotButton.href = "#";
    this.screenshotRdy = false;
    this.step = 1;
  }

  deleteMember(member: Member) {
    this.members.splice(this.members.indexOf(member), 1);
    this.getRolls();
  }

  getRolls() {
    this.rolls = [];
    this.donors = [];
    this.recievers = [];
    this.members.map(member => {
      this.donors.push(member.name);
      this.recievers.push(member.name);
    })
    if (this.members.length <= 1) return;
    if (!this.rollPossible()) return;

    let pairs = this.shuffle(this.getPairs());
    let donorsId = [];
    let recieversId = [];  
    let set = [];
    let i = 0;

    while (set.length !== this.members.length && i < 1000) {
      donorsId = [];
      recieversId = [];
      set = [];
      pairs.map(pair => {
        if (!donorsId.includes(pair[0].id) &&
          !recieversId.includes(pair[1].id)) {
            donorsId.push(pair[0].id);
            recieversId.push(pair[1].id);
            set.push(pair)
        }
      })
      pairs = this.shuffle(pairs);
      ++i;
    }
    if (set.length === this.members.length) this.rolls = [...set];
  }

  rollPossible() {
    let pairs = this.getPairs();
    let donors = [];
    let recievers = [];

    pairs.map(pair => {
      donors.push(pair[0].id);
      recievers.push(pair[1].id);
    })

    donors = [...new Set(donors)];
    recievers = [...new Set(recievers)];

    return donors.length === this.members.length && recievers.length === this.members.length 
  }

  getPairs() {
    let arr = [...this.members];
    let pairs = [];
    arr.map((member1, i) => {
      this.members.map(member2 => {
        if (!member1.exclusions.includes(member2.id)) {
          pairs.push([member1, member2])
        }
      })
    })
    return pairs;
  }
    
 

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  

  setExclusions(member: Member, excludeMember: Member) {
    if (member.exclusions.includes(excludeMember.id)) {
      member.exclusions.splice(member.exclusions.indexOf(excludeMember.id), 1)
    } else {
      member.exclusions.push(excludeMember.id);
    }
    this.getRolls();
  }


}

export interface Member {
  id: number,
  name: string,
  exclusions: number[],
}
