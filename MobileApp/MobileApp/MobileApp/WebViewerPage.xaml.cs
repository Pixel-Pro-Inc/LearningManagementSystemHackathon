using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MobileApp
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class WebViewerPage : ContentPage
    {
        string baseLink = "";
        string currentLink = "";
        public WebViewerPage()
        {
            NavigationPage.SetHasNavigationBar(this, false);

            InitializeComponent();

            baseLink = "https://learning-system-hack.herokuapp.com/";

            ShowWebView();
        }

        void ShowWebView()
        {
            view.Source = baseLink;
            view.Navigating += View_Navigating;
        }

        private void View_Navigating(object sender, WebNavigatingEventArgs e)
        {
            currentLink = e.Url;
        }

        void GoBack()
        {
            view.GoBack();
        }

        public bool HandleBackButton()
        {
            GoBack();

            return true;
        }

        private void Button_Clicked(object sender, EventArgs e)
        {
            GoBack();
        }
    }
}