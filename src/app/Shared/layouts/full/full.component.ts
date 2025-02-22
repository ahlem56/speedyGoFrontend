import { CommonModule } from "@angular/common";
import { Component, OnInit, HostListener } from "@angular/core";
import { Router, RouterModule, NavigationStart, NavigationEnd } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { NavigationComponent } from "src/app/Shared/shared/header/navigation.component";
import { SidebarComponent } from "src/app/Shared/shared/sidebar/sidebar.component";
import { filter } from "rxjs";

@Component({
  selector: "app-full-layout",
  imports: [RouterModule, SidebarComponent, NavigationComponent, CommonModule, NgbCollapseModule],
  templateUrl: "./full.component.html",
  styleUrls: ["./full.component.scss"]
})
export class FullComponent implements OnInit {
  constructor(public router: Router) {}

  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = "full";
  public hideSidebarAndHeader: boolean = false;  // Flag to hide sidebar and header

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    // Listen for route changes and update hideSidebarAndHeader accordingly
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart || event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Set the hideSidebarAndHeader flag based on the route
      this.hideSidebarAndHeader = 
        this.router.url === '/login' || 
        this.router.url === '/signup' || 
        this.router.url === '/forgot-password';
    });

    // Force navigation to landingPage if initially on the root path
    if (this.router.url === "/") {
      this.router.navigate(["/landingPage"]);
    }

    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = "full";
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case "full":
        this.sidebartype = "mini-sidebar";
        break;

      case "mini-sidebar":
        this.sidebartype = "full";
        break;

      default:
    }
  }
}
