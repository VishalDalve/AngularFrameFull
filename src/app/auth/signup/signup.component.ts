import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy{ 
	isLoading = false;
	private authStatusSub: Subscription;

	ngOnInit(){
		this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
			this.isLoading = false;
		})
	}

	constructor(public authService: AuthService){}

	onSignup(form: NgForm){
		if(form.invalid){
			return
		}
		this.isLoading = true;
		this.authService.createUser(form.value.email, form.value.password);
	}

	ngOnDestroy(){
		this.authStatusSub.unsubscribe();
	}
}
