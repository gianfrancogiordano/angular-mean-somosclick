import { Component, OnInit } from '@angular/core';
import { SettingServiceService } from '../../services/setting-service.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( private settingServiceService: SettingServiceService ) { }

  ngOnInit() {
    this.settingServiceService.checkCurrentTheme();
  }

  changeColor( color: string ) {
    this.settingServiceService.changeColor( color );
  }

}
